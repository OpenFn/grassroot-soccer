upsert(
  'Event__c',
  'Name',
  fields(
    field('Name', dataValue('form.@name')),
    relationship('RecordType', 'Name', 'Intervention'),
    relationship(
      'Grant_c',
      'Grant__c.CommCare_Ext_ID__c',
      dataValue('form.grant')
    ),
    relationship(
      'Business_Unit_c',
      'Business_Unit__c.CommCare_Ext_ID__c',
      dataValue('form.business_unit')
    ),
    relationship(
      'Site_c',
      'Site__c.CommCare_Ext_ID__c',
      dataValue('form.site')
    ),
    relationship(
      'Country_c',
      'Country__c.CommCare_Ext_ID__c',
      dataValue('form.site_country')
    ),
    relationship(
      'Venue_c',
      'Venue__c.CommCare_Ext_ID__c',
      dataValue('form.Venue')
    ),
    relationship(
      'Curriculum__c',
      'Curriculum__c.CommCare_Ext_ID__c',
      dataValue('form.curriculum_selection.curriculum')
    ),
    field('Delivery_Method__c', dataValue('form.delivery_method')),
    field('Class_Group_Team__c', dataValue('form.class_grade')),
    relationship(
      'Venue_c',
      'Geographical_area__c',
      dataValue('form.geographic_area')
    ),
    field('Pre_Post_Completed__c', dataValue('form.prepost_administered')),
    relationship('Person_c', 'Coach_A__c.CommCare_Ext_ID__c', dataValue('form.coaches')),
    field('Start_Date__c', dataValue('form.intervention_dates.start_date')),
    field('End_Date__c', dataValue('form.intervention_dates.end_date'))
  )
);
