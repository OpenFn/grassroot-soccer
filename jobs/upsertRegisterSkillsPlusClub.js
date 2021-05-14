// push to production
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
 
  state.data.destinationCoachFields = state.data.form.coaches
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

  return state; 
}); 



upsert(
  'Event__c',
  'CommCare_Case_ID__c',
  state=>({
  ...fields(
      field('Name', dataValue('form.name_of_skillz_plus_club')),
      field('CommCare_Ext_ID__c', dataValue('form.name_of_skillz_plus_club')),
      field('CommCare_Case_ID__c', dataValue('form.case.@case_id')),
      relationship('RecordType', 'Name', 'Intervention'),
      relationship('Site__r', 'CommCare_Ext_ID__c', dataValue('form.skillz_plus_site')),
      relationship('Venue__r', 'CommCare_Ext_ID__c', dataValue('form.skillz_plus_venue')),
    ),
    ...fields(...state.data.destinationCoachFields)
  })
);
