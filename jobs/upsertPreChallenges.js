fn(state => {
  function transform(value) {
    if (!value) return;
    switch (value.toString().trim().toLowerCase()) {
      case 'true':
      case 'yes':
      case 'agree':
      case 'verdade':
      case 'concorda':
        return 1;
      case 'false':
      case 'no':
      case 'disagree':
      case 'discorda':
      case 'falso':
        return 2;
      case 'i_dont_know':
        return 3;
      case 'unanswered':
        return 4;
      case 'not_applicable':
        return 5;
      default:
        return value;
    }
  }

  state.helperFunctions = { transform };

  return query(
    `SELECT Participant_Identification_Number_PID__c from Person__c where Participant_Identification_Number_PID__c  = '${state.data.form.case['@case_id']}'`
  )(state);
});

fn(state => {
  const { form } = state.data;

  const formVersion = Object.keys(form).find(key => key.startsWith('portuguese_pre_challenge'));

  console.log("form version", formVersion);

  const sfFieldMapping = {
    'portuguese_pre_challenge_gcr_-_skillz_malaria': {
      Pre_1__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.dormir_dentro_da_rede_mosquiteira_tratada_todas_as_noites_pode_proteger_me_',
      Pre_2__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.posso_esperar_uns_dias_antes_de_fazer_o_teste_de_malria_se_tiver_febres',
      Pre_3__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.um_mdico_tradicionalcurandeiro_pode_me_dar_um_tratamento_para_curar_a_malri',
      Pre_4__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.se_tiver_malria_e_no_for_tratado_posso_transmitir_a_malria_a_algum',
      Pre_5__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.somente_as_mulheres_grvidas_e_as_crianas_menores_de_5_anos__que_precisam_de',
      Pre_6__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.a_malria_pode_matar_se_no_fr_tratada',
      Pre_7__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.a_febre__um_sintoma_da_malria',
      Pre_8__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.eu_me_sinto_bem_conmigo_mesmo',
      Pre_9__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.tenho_algum_na_minha_vida_que_pode_me_dar_bons_conselhos_quando_preciso_de_',
      Pre_10__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.eu_sei_onde_posso_ter_tratamento_para_malria_na_minha_comunidade',
      Pre_11__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.posso_proteger-me_da_malria',
    },
    'pre_challenge_south_africa_-_skillz_girl': {
      Pre_1__c:
        'pre_challenge_south_africa_-_skillz_girl.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
      Pre_2__c:
        'pre_challenge_south_africa_-_skillz_girl.as_a_girl_i_have_a_greater_risk_of_getting_hiv_than_boys_my_age',
    },
  };

  const pluckSfValue = val => {
    return sfFieldMapping[formVersion][val];
  };

  return { ...state, pluckSfValue };
});

fn(state => {
  console.log(state.pluckSfValue('Pre_1__c'));
  return state;
});

fn(state => {
  const PID = lastReferenceValue('records[0].Participant_Identification_Number_PID__c')(state);

  if (!PID) {
    console.log(
      `Participant not found with Participant_Identification_Number_PID__c: ${state.data.form.case['@case_id']}`
    );
    return state;
  }

  return upsert(
    'Attendance__c',
    'CommCare_Ext_ID__c',
    fields(
      //field('Event__c', dataValue('form.hidden_properties.intervention_name')),
      //relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
      relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),
      // relationship('Person_Attendance__r','CommCare_Ext_ID__c', state => {
      //   return (
      //     dataValue('form.hidden_properties.participant_first_name')(state) +
      //     dataValue('form.hidden_properties.participant_surname')(state)
      //   )
      // }),

      field('CommCare_Ext_ID__c', state => {
        return `${dataValue('form.case.@case_id')(state)}-${scrubEmojis(
          dataValue('form.hidden_properties.intervention_name')(state),
          ''
        ).replace(/\//gi, '')}`;
      }),

      //field(
      //'Person_Attendance__c',
      // state =>
      //   dataValue('form.hidden_properties.participant_first_name')(state) +
      //    ' ' +
      //   dataValue('form.hidden_properties.participant_surname')(state)
      //),
      field('Gender__c', dataValue('form.hidden_properties.gender')),
      field('Grade__c', state => {
        const grade = dataValue('form.hidden_properties.grade')(state);
        return grade ? grade.replace(/\D/g, '') : undefined;
      }),
      field('Class__c', dataValue('form.hidden_properties.class')),
      field('Pre_Post_Completed__c', state => {
        var done = dataValue('form.hidden_properties.pre_questionnaire_complete')(state);
        return done === 'Yes' ? true : done === 'No' ? false : undefined;
      }),
      field('Date_Pre_Administered__c', dataValue('form.date')),
      field('Pre_1__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_1__c'));
        return state.helperFunctions.transform(value);
      }),
      field('Pre_2__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_2__c')); 
        return state.helperFunctions.transform(value);
      }),
      
       field('Pre_3__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_3__c')); 
        return state.helperFunctions.transform(value);
      }),
      
       field('Pre_4__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_4__c')); 
        return state.helperFunctions.transform(value);
      }),
      
       field('Pre_5__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_5__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_6__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_6__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_7__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_7__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_8__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_8__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_9__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_9__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_10__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_10__c')); 
        return state.helperFunctions.transform(value);
      }),
       field('Pre_11__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_10__c')); 
        return state.helperFunctions.transform(value);
      })
    )
  )(state);
});

//Removing mapping... need case_id to upsert Events. Date_of_Pre__c update should be handled on the SF side.
// upsert(
//   'Event__c',
//   'CommCare_Ext_ID__c',
//   fields(
//     field('CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
//     field('Date_of_Pre__c', dataValue('form.date')),

//   )
// );
