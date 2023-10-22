// permissions.js
 const permissions = {
    Query: {
        getAppointments: "superadmin|admin",
        getPenaltyPolicy: "admin",
        getPenaltyResetSession: "user|frontdesk",
    },
    Mutation: {
        createUpdateAppointment: "superadmin|finance"

    }
};

export default permissions