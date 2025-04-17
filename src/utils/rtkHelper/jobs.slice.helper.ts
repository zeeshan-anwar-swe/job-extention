export function updateJobStatusByResponse<T extends { id: any; status: any }>(
	arr: T[],
	updateObj: { id: any; status: any },
): T[] {
	return arr.map((item) =>
		item.id === updateObj.id ? { ...item, status: updateObj.status } : item,
	);
}

export function findJobsByCandidateId(jobs: any[], candidateId: string): any[] {
	return jobs.filter((job) =>
		job.appliedCandidates.some((candidate: any) => candidate.candidateId === candidateId),
	);
}
