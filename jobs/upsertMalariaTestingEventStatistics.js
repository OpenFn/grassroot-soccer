upsert(
  'Event__c',
  'Name',
fields(
  field('Name', dataValue('form.intervention name')),
  field(
    'Tested_Negative_Males_0_9__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question2')
  ),
  field(
    'Tested_Negative_Males_10_14__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question7')
  ),
  field(
    'Tested_Negative_Males_15_19__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question13')
  ),
  field(
    'Tested_Negative_Males_20_24__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question18')
  ),
  field(
    'Tested_Negative_Males_25_49__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question28')
  ),
  field(
    'Tested_Negative_Males_50__c',
    dataValue('form.table_1_testing_results_malaria.male_malaria_negative.question32')
  ),
  field('Tested_Positive_Males_0_9__c', dataValue('form.table_1_testing_results_malaria.question33.question36')),
  field('Tested_Positive_Males_10_14__c', dataValue('form.table_1_testing_results_malaria.question33.question41')),
  field('Tested_Positive_Males_15_19__c', dataValue('form.table_1_testing_results_malaria.question33.question45')),
  field('Tested_Positive_Males_20_24__c', dataValue('form.table_1_testing_results_malaria.question33.question50')),
  field('Tested_Positive_Males_25_49__c', dataValue('form.table_1_testing_results_malaria.question33.question56')),
  field('Tested_Positive_Males_50__c', dataValue('form.table_1_testing_results_malaria.question33.question60')),
  field('Tested_Negative_Females_0_9__c', dataValue('form.table_1_testing_results_malaria.question61.question65')),
  field('Tested_Negative_Females_10_14__c', dataValue('form.table_1_testing_results_malaria.question61.question69')),
  field('Tested_Negative_Females_15_19__c', dataValue('form.table_1_testing_results_malaria.question61.question73')),
  field('Tested_Negative_Females_20_24__c', dataValue('form.table_1_testing_results_malaria.question61.question78')),
  field('Tested_Negative_Females_25_49__c', dataValue('form.table_1_testing_results_malaria.question61.question84')),
  field('Tested_Negative_Females_50__c', dataValue('form.table_1_testing_results_malaria.question61.question88')),
  field('Tested_Positive_Females_0_9__c', dataValue('form.table_1_testing_results_malaria.question89.question92')),
  field('Tested_Positive_Females_10_14__c', dataValue('form.table_1_testing_results_malaria.question89.question97')),
  field('Tested_Positive_Females_15_19__c', dataValue('form.table_1_testing_results_malaria.question89.question101')),
  field('Tested_Positive_Females_20_24__c', dataValue('form.table_1_testing_results_malaria.question89.question106')),
  field('Tested_Positive_Females_25_49__c', dataValue('form.table_1_testing_results_malaria.question89.question112')),
  field('Tested_Positive_Females_50__c', dataValue('form.table_1_testing_results_malaria.question89.question116'))
));
