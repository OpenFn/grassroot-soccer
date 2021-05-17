alterState((state) => {
  
  function clean(str) {
    if (!!str)
      return str
        .split('_')
        .map(word => {
          let new_word = word.toString().toLowerCase();
          return new_word.slice(0, 1).toUpperCase() + new_word.slice(1);
        })
        .join(' ');
  }
  
  const coachFieldNames = ['Coach_A__r','Coach_B__r','Coach_C__r','Coach_D__r']
 
  state.data.destinationCoachFields = state.data.form.event_information.coaches
  .split(' ')
  .reduce(
    (accumulator, currentValue, currentIndex) => [
      ...accumulator,
      (currentIndex < coachFieldNames.length && !!currentValue
        ? relationship(coachFieldNames[currentIndex], 'CommCare_Ext_ID__c', currentValue)
        : []),
    ],
    []
  );
  
  const eventtype = state.data.form.event_information.event_type; 
  
  const recordtype = eventtype==='community_health_event' || eventtype==='soccer_tournament' ? 'Testing Event' : 'Malaria Testing Event'; 
  console.log(recordType)
  
  state.data.recordtype = recordtype; 
  
  return state; 
}); 

upsert(
  'Event__c',
  'CommCare_Case_ID__c',
  state=>({
  ...fields(
    field('Name', dataValue('form.event_information.Event_Name')),
    relationship('RecordType', 'Name', dataValue('recordtype')),
    field('CommCare_Ext_ID__c', dataValue('form.event_information.Event_Name')),
    field('CommCare_Case_ID__c', dataValue('form.case.@case_id')),
    field('Business_Unit__c', state => {
      const bu = dataValue('form.event_information.business_unit')(state); 
      return bu==='65680f0c4c144b03ad0f86bdc46c1ebc' ? 'GRS Zambia' : 
      bu==='04d98397e28046118fade28ced6b65cb' ? 'GRS Zimbabwe' : 
      bu==='ed125ab19ec34aacab79585e59eb76f4' ? 'GRS Partnerships': undefined ; 
    }),
    relationship('Site__r','CommCare_Ext_ID__c', dataValue('form.event_information.site')),
    relationship('Venue__r', 'CommCare_Ext_ID__c',dataValue('form.event_information.Venue')),
    field('Date__c', dataValue('form.event_information.event_date')),
    field('Event_Type__c', dataValue('recordtype')),
    field('Testing_Event_Type__c', state => {
      const type = dataValue('form.event_information.event_type')(state); 
      return type.includes('malaria') ? 'Malaria Testing Event (General Event)' : 'Other';
    }),
    field('Coordinator__c', dataValue('form.event_information.event_coordinator')),
  ),
  ...fields(...state.data.destinationCoachFields)
  })
);
