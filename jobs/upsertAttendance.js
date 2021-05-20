query(`SELECT Name FROM Event__c WHERE CommCare_Case_ID__c = '${state.data.form.case['@case_id']}'`);
alterState(state => {
  console.log(
    lastReferenceValue('records[0].name')(state);
  );
  return state;
});

// alterState(state => {
//   function getSessionValue(present) {
//     switch (present.toString().toLowerCase()) {
//       case 'yes':
//         return 'X';
//       case 'no':
//         return 'A';
//       case '':
//         return 'N';
//       default:
//         return 'U';
//     }
//   }

//   function getSessionId(session_text) {
//     return session_text.toString().trim().slice(0, session_text.indexOf(' ')).slice(1);
//   }

//   function objectToArray(object) {
//     if (!object) return [];
//     return !Array.isArray(object) ? [object] : object;
//   }

//   state.data.form.attendance_list.update_participant_cases.item = objectToArray(
//     state.data.form.attendance_list.update_participant_cases.item
//   );

//   const sessionText = dataValue('form.attendance_list.session')(state);
//   const sessionId = getSessionId(sessionText);

//   //   @aleksa-krolls confirm the path for the session date
//   const sessionDate = dataValue("form.case['@date_modified']")(state);

//   state.data.form.attendance_list.update_participant_cases.item =
//     state.data.form.attendance_list.update_participant_cases.item.map(item => {
//       const sessionValue = getSessionValue(item.attendance_session);
//       return {
//         ...item,
//         dynamicFields: { [`Session_${sessionId}__c`]: sessionValue, [`Session_${sessionId}_Date__c`]: sessionDate },
//       };
//     });

//   return state;
// });

// each(
//   merge(
//     dataPath('form.attendance_list.update_participant_cases.item[*]'),
//     fields(
//       field('intervention_name', dataValue('form.intervention_name')),
//       field('event_case_id', dataValue("form.case['@case_id']"))
//     )
//   ),
//   upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
//     ...fields(
//       //  @aleksa-krolls confirm if the value here should be the case_id of the person in attendance
//       // relationship('Event__r', 'CommCare_Case_ID__c', state => state.data['@id']),
//       relationship('Event__r', 'CommCare_Case_ID__c', dataValue('event_case_id')),
//       field('CommCare_Ext_ID__c', state => {
//         // @aleksa-krolls intervention_name is not in some sample data
//         const eventid = dataValue('event_case_id')(state); 
//         //const eventid = state.data.form.case['@case_id'];
//         const personid = state.data['@id'];
//         return personid + '-' + eventid;
//       }),
//       //[[state => dataValue('form.intervention_name')(state)], 'test'],
//       // @aleksa-krolls I get this error:
//       // INVALID_FIELD: Foreign key external ID: ce3f0b88-a612-4f5e-b26c-9888f65ee376 not found for field CommCare_Case_ID__c in entity Event__c
//       relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', state => state.data['@id'])
//     ),
//     ...state.data.dynamicFields,
//   }))
// );
