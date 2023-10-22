import tryCatchWrapper from '../utils/tryCatchWrapper.js';

const getAppointments = async (parent, args, context) =>{
  console.log(" resolver runs");
  return
}

const getPenaltyPolicy = async (parent, args, context) =>{
  console.log(" resolver runs");
  return
}
const getPenaltyResetSession = async (parent, args, context) =>{
  console.log(" resolver runs");
  return
}

const createUpdateAppointment = async (parent, args, context) =>{
  console.log(" resolver runs");
  return
}


export default {
  Query: {
    getAppointments: tryCatchWrapper(getAppointments),
    getPenaltyPolicy: tryCatchWrapper(getPenaltyPolicy),
    getPenaltyResetSession: tryCatchWrapper(getPenaltyResetSession),
  },
  Mutation: {
    createUpdateAppointment: tryCatchWrapper(createUpdateAppointment),
  },
};
