// push to production
alterState(state => {
  const present = dataValue('form.present')(state).toLowerCase();

  function getSessionValue() {
    let value;
    switch (present) {
      case 'yes':
        value = 'X';
        break;
      case 'no':
        value = 'A';
        break;
      case '':
        value = 'N';
        break;
      default:
        value = 'U';
        break;
    }
    return value;
  }

  const session_text = dataValue('form.session')(state);

  const session_id = session_text.trim().slice(0, session_text.indexOf(' ')).slice(1);
  
  let external_id =
    dataValue('form.intervention_name')(state) +
    dataValue('form.coach_name')(state);

  state.data.commcare_external_id = external_id.toLowerCase().replace(/\s/g, '').trim();

  state.data.dynamicFields = [
    field(`Session_${session_id}__c`, getSessionValue()),
    field(`Session_${session_id}_Date__c`, dataValue('form.date')(state)),
    field(`Session_${session_id}_Duration__c`, dataValue('form.duration')(state)), //NOTE: Duration fields don't exist in SF? 
  ];

  return state;
});

upsert('Attendance__c', 'CommCare_Ext_ID__c', state => ({
  ...fields(
        //relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.intervention_name')), 
        relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('form.coach_name')), 
        field('CommCare_Ext_ID__c', dataValue('commcare_external_id'))
      ),
  ...fields(...state.data.dynamicFields),
}));
