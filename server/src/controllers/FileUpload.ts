import { UUIDV4 } from 'sequelize';
import multer from 'multer';
import unzipper from 'unzipper';
import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import ExcelJS from 'exceljs';
import Methods from './JSMethods';
import PythonMethods from './PythonMethods';
import Model from '../AI Model/Model';
import mongoose, { Schema } from 'mongoose';

var Any = new Schema(
	{
		ApplicationName: {
			type: String
		},
		ready: {
			type: String
		}
	},

	{
		timestamps: true
	}
);

export const Applications = mongoose.model('Applications', Any);

const columns = [
	{ header: 'FileName', key: 'filename', width: 20 },
	{ header: 'Method', key: 'method', width: 20 },
	{ header: 'Type', key: ' type', width: 20 },
	{ header: 'Method Code', key: 'methodCode', width: 20 },
	{ header: 'AI Explanation', key: 'explain', width: 20 }
];

const uploadZip = async (req: Request, res: Response, next: NextFunction) => {
	const user = 'Admin';
	let arr: any = [];
	const applicationName = req.body.applicationName;
	try {
		if (!req.file) {
			return res.status(400).send('No file uploaded.');
		}

		const uploadedFile = req.file;
		console.log(uploadedFile.mimetype);

		const subfolderName = applicationName; // Modify this to your desired subfolder name
		const saveDirectory = path.join('E:\\codes\\GenAiBackend', user, subfolderName);

		if (!fs.existsSync(saveDirectory)) {
			fs.mkdirSync(saveDirectory, { recursive: true });
		}
		const readStream = require('stream').Readable.from(uploadedFile.buffer);
		await readStream.pipe(unzipper.Extract({ path: saveDirectory })).promise();
		console.log('File unzipped and saved successfully.');
		createExcelFile('data.xlsx', 'Application Data', columns, saveDirectory).then(async (resp) => {
			const person = await new Applications({
				ApplicationName: subfolderName,
				ready: false
			}).save();
			const jsFiles = Methods.getAllFiles(saveDirectory, []);
			const pyFiles = PythonMethods.getAllPYFiles(saveDirectory, []);

			runFunctionsSequentially(jsFiles, user, subfolderName, pyFiles);

			res.status(200).send({ arr });
		});
	} catch (error) {
		return res.status(200).json({ message: `${error} noob error` });
	}
};

async function runFunctionsSequentially(allFiles: any, user: any, subfolderName: any, pyFiles: any) {
	console.log('Starting both functions sequentially.');
	await JavascriptExtraction(allFiles, user, subfolderName, pyFiles);

	console.log('Both functions have completed.');
}

const createExcelFile = async (filename: string, sheetName: string, columns: Array<{}>, appPath: string) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet(sheetName);

	// Set column headersW
	worksheet.columns = columns;

	const fullPath = path.join(appPath, filename);

	try {
		await workbook.xlsx.writeFile(fullPath);
		console.log(`Excel file "${filename}" created successfully.`);
	} catch (error) {
		console.error(`Error creating Excel file "${filename}":`, error);
	}
};

async function JavascriptExtraction(allFiles: any, user: any, subfolderName: any, pyFiles: any) {
	await allFiles.map(async (item: any) => {
		const results: any = await Methods.extractFunctionsFromFile(item, 'Javascript', user, subfolderName);
		console.log(results);
	});
	await new Promise((resolve) => setTimeout(resolve, 1000));
	console.log('JavascriptExtraction 1 has completed.');
	await PythonExtraction(pyFiles, user, subfolderName);
	// console.log(result);
}

async function PythonExtraction(allFiles: any, user: any, subfolderName: any) {
	await allFiles.map(async (item: any) => {
		const results: any = await PythonMethods.extractPythonFunctionsFromFile(item, 'Python', user, subfolderName);
		console.log(results);
	});
	await new Promise((resolve) => setTimeout(resolve, 2000));
	console.log('PythonExtraction 2 has completed.');
}

// Example usage:

export default { uploadZip };
