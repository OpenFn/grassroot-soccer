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
  
  state.data.form.delivery_method = clean(state.data.form.delivery_method);
  
  const coachFieldNames = ['Coach_A__r','Coach_B__r','Coach_C__r','Coach_D__r']
 
  state.data.coaches = state.data.form.coaches
  .split(' ')
  .reduce(
    (accumulator, currentValue, currentIndex) => [
      ...accumulator,
      currentIndex < coachFieldNames.length && !!currentValue
        ? relationship(coachFieldNames[currentIndex], 'CommCare_Ext_ID__c', currentValue)
        : [],
    ],
    []
  );
  
  return state; 
}); 

upsert(
  'Event__c',
  'CommCare_Ext_ID__c',
  state=>({
  ...fields(
    field('CommCare_Ext_ID__c', dataValue('form.name_of_intervention')),
    field('Grant_Text__c', dataValue('form.grant')),
    relationship('RecordType', 'Name', 'Intervention'),
    field('Business_Unit__c', state => {
      const bu = dataValue('form.business_unit')(state); 
      return bu==='X' ? 'GRS Zambia' : bu; 
    }),
    relationship(
      'Site__r',
      'CommCare_Ext_ID__c',
      dataValue('form.site')
    ),
    relationship(
      'Venue__r',
      'CommCare_Ext_ID__c',
      dataValue('form.Venue')
      
    ),
    relationship(
      'Curriculum__r',
      'CommCare_Ext_ID__c',
      dataValue('form.curriculum_selection.curriculum')
    ),
    field('Delivery_Method__c', dataValue('form.delivery_method')),
    field('Class_Group_Team__c', dataValue('form.class_grade')),
    field('Pre_Post_Administered__c', dataValue('form.prepost_administered')),
    field('Start_Date__c', dataValue('form.intervention_dates.start_date')),
    field('End_Date__c', dataValue('form.intervention_dates.end_date'))
  ),
  ...fields(...state.data.coaches)
  })
);