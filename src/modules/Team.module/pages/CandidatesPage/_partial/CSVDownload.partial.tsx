import React, { useEffect } from 'react';
import Button from '../../../../../components/ui/Button';
import Modal, { ModalBody, ModalFooter, ModalHeader } from '../../../../../components/ui/Modal';
import { CardTitle } from '../../../../../components/ui/Card';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../../store';
import { getAgencyCandidatesCsvList, getTeamCandidatesCsvList } from '../../../../../store/slices/Candiates.slice';
import Icon from '../../../../../components/icon/Icon';

const DataToCsvService = () => {
	const downloadFileCSV = (data: any[], filename = 'data', fields: string[]) => {
		const csvData = convertToCSV(data, fields);
		const blob = new Blob(['\ufeff' + csvData], {
			type: 'text/csv;charset=utf-8;',
		});
		const dwldLink = document.createElement('a');
		const url = URL.createObjectURL(blob);
		const isSafariBrowser =
			navigator.userAgent.indexOf('Safari') !== -1 &&
			navigator.userAgent.indexOf('Chrome') === -1;
		if (isSafariBrowser) {
			dwldLink.setAttribute('target', '_blank');
		}
		dwldLink.setAttribute('href', url);
		dwldLink.setAttribute('download', filename + '.csv');
		dwldLink.style.visibility = 'hidden';
		document.body.appendChild(dwldLink);
		dwldLink.click();
		document.body.removeChild(dwldLink);
	};

	const convertToCSV = (objArray: any[], headerList: string[]) => {
		let str = '';
		const row = [
			'S.No',
			...headerList.map((header) => header.charAt(0).toUpperCase() + header.slice(1)),
		].join(',');
		str += row + '\r\n';

		for (let i = 0; i < objArray.length; i++) {
			let line = i + 1 + '';

			const dataRow = headerList.map((header) => {
				let value = objArray[i][header];

				// Handle null or undefined values
				if (value === null || value === undefined) {
					return 'null';
				}

				// Manually format the 'invitedOn' date
				if (header === 'invitedOn' && value) {
					const date = new Date(value);
					value = `"${formatDate(date)}"`; // Quote the date
				}

				if (header === 'compaignStartedOn' && value) {
					const date = new Date(value);
					value = `"${formatDate(date)}"`; // Quote the date
				}

				if (header === 'acceptedOn' && value) {
					const date = new Date(value);
					value = `"${formatDate(date)}"`; // Quote the date
				}

				if (header === 'createdDate' && value) {
					const date = new Date(value);
					value = `"${formatDate(date)}"`; // Quote the date
				}

				// Handle nested 'candidate' object
				if (typeof value === 'object' && value !== null && header === 'candidate') {
					return `"${value.name} (${value.email})"`;
				}

				// Handle arrays
				if (Array.isArray(value)) {
					if (header === 'providers') {
						value = value.length; // Handle providers array by returning their length
					} else {
						value = value.join(', '); // Concatenate other array values into a comma-separated string
					}
				}

				return value;
			});

			line += ',' + dataRow.join(',');
			str += line + '\r\n';
		}
		return str;
	};

	const formatDate = (date: Date): string => {
		const months = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		];
		const day = date.getDate();
		const month = months[date.getMonth()];
		const year = date.getFullYear();
		return `${month} ${day}, ${year}`;
	};

	return {
		downloadFileCSV,
	};
};

const DownloadCsvModal = ({ isOpen, onClose }: any) => {
	const dispatch: AppDispatch = useDispatch();

	const { csvData, modalLoading } = useSelector((state: RootState) => state.candidates);

	const { downloadFileCSV } = DataToCsvService();

	const handleDownload = () => {
		if (csvData && csvData.length > 0) {
			// Get all unique keys from the first object in the array
			const headers = Object.keys(csvData[0]);

			// Filter out 'id' and 'candidateId' from the headers
			const filteredHeaders = headers.filter(
				(header) => header !== 'id' && header !== 'candidateId',
			);

			// Adjust headers for nested 'candidate' object
			const updatedHeaders = filteredHeaders
				.map((header) => {
					if (header === 'candidate') {
						return ['name', 'email'].map((key) => `candidate.${key}`).flat();
					}
					return header;
				})
				.flat();

			// Prepare data for CSV conversion, handling nested 'candidate' object
			const processedData = csvData.map((item) => {
				const newItem: any = {};
				for (const key in item) {
					if (key === 'candidate' && item.candidate) {
						newItem['candidate.name'] = item.candidate.name;
						newItem['candidate.email'] = item.candidate.email;
					} else if (key !== 'id' && key !== 'candidateId') {
						newItem[key] = item[key] ?? 'null'; // Use nullish coalescing operator
					}
				}
				return newItem;
			});

			downloadFileCSV(processedData, 'agency_candidates', updatedHeaders);
			onClose();
		} else {
			// Handle the case where csvData is empty
			console.warn('No data to download.');
			onClose();
		}
	};

	useEffect(() => {
		if (isOpen) {
			dispatch(getTeamCandidatesCsvList());
		}
	}, [dispatch, isOpen]);

	return (
		<Modal isOpen={isOpen} setIsOpen={onClose}>
			<ModalHeader>
				<CardTitle>Download CSV</CardTitle>
			</ModalHeader>
			<ModalBody>
				<div className='mx-auto w-fit'>
					<Icon size='text-9xl' color='emerald' icon='DuoDownloadedFile' />
				</div>
			</ModalBody>
			<ModalFooter>
				<Button variant='solid' isLoading={modalLoading} onClick={handleDownload}>
					Download CSV
				</Button>
			</ModalFooter>
		</Modal>
	);
};

export default DownloadCsvModal;
