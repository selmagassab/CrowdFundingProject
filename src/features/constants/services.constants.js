const URL = {
    baseApiUrl: "http://localhost:5000",

    projects: {
        fetchProjects: `/projects/active`,
        fectchDeletedProjects: `/projects/deleted`,
        addProject: `/projects/add`,
    },
    forums: {
        fetchForums: `/forum/`,
    },
    tasks: {
        fetchTasks: `/tasks/`,
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
