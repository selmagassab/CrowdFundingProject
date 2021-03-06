const URL = {
    baseApiUrl: process.env.REACT_APP_URI_SERVER + "",

    projects: {
        fetchProjects: `/projects/active`,
        fetchProjectByCompaignId: `/projects`,
        fectchDeletedProjects: `/projects/deleted`,
        addProject: `/projects/add`,
    },
    forums: {
        fetchForums: `/forum/`,
    },
    tasks: {
        fetchTasks: `/tasks`,
        getTaskByProjectId: `/tasks/all`,
    },
    invoiceProjects: {
        fetchInvoiceProjects: `/invoiceProject/`,
        getInvoiceByProjectId: `/invoiceProject/all`,
    },
    complaintProjects: {
        fetchComplaintProject: `/complaintProject/`,
        getComplaintByProjectId: `/complaintProject/all`,
    },
    invoiceTasks: {
        fetchInvoiceTasks: `/invoiceTask/`,
        getInvoiceByTaskId: `/invoiceTask/all`,
    },
    complaintTasks: {
        fetchComplaintTasks: `/complaintTask/`,
        getComplaintByTaskId: `/complaintTask/all`,
    },
};

export default URL;
