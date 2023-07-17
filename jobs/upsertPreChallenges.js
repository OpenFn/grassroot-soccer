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

  const formVersion = Object.keys(form).find(key => key.startsWith('pre_challenge'));

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
      Pre_1__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_know_how_to_overcome_challenges_that_i_may_face_in_my_life',
      Pre_2__c: 'form.pre_challenge_south_africa_-_skillz_girl.in_general_i_wish_i_could_appreciate_myself_more',
      Pre_3__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_would_be_able_to_ask_my_boyfriend_that_i_want_to_use_a_condom',
      Pre_4__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_can_say_no_to_sex_even_if_my_boyfriend_or_friends_pressure_me_to_have_sex',
      Pre_5__c: 'form.pre_challenge_south_africa_-_skillz_girl.if_i_am_sexually_active_i_go_to_a_healthcare_provider_to_get_protection_fro',
      Pre_6__c: 'form.pre_challenge_south_africa_-_skillz_girl.question2',
      Pre_7__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      Pre_8__c: 'form.pre_challenge_south_africa_-_skillz_girl.it_is_only_the_girls_responsibility_to_avoid_getting_pregnant',
      Pre_9__c: 'form.pre_challenge_south_africa_-_skillz_girl.sometimes_a_man_may_have_a_good_reason_to_hit_his_girlfriend_or_wife',
      Pre_10__c: 'form.pre_challenge_south_africa_-_skillz_girl.it_is_ok_for_a_girl_to_refuse_sex_when_her_boyfriend_wont_use_a_condom',
      Pre_11__c: 'form.pre_challenge_south_africa_-_skillz_girl.it_is_ok_for_a_boy_to_refuse_sex_when_his_girlfriend_doesnt_want_him_to_use',
      Pre_12__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_can_decide_when_is_the_right_time_for_me_to_have_a_baby',
      Pre_13__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      Pre_14__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_gender_base',
      Pre_15__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_prevention_',
      Pre_16__c: 'form.pre_challenge_south_africa_-_skillz_girl.one_sign_of_pregnancy_is_a_girl_missing_her_period',
      Pre_17__c: 'form.pre_challenge_south_africa_-_skillz_girl.i_know_at_least_three_methods_to_avoid_an_unwanted_pregnancy',
      Pre_18__c: 'form.pre_challenge_south_africa_-_skillz_girl.as_a_girl_i_have_a_greater_risk_of_getting_hiv_than_boys_my_age',
      Pre_19__c: 'form.pre_challenge_south_africa_-_skillz_girl.if_a_girl_is_sexually_violated_she_can_reduce_her_risk_of_getting_hiv_by_ta',
      Pre_20__c: 'form.pre_challenge_south_africa_-_skillz_girl.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
    },
    'portuguese_pre_challenge_gcr_-_skillz_girl': {
      Pre_1__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.falei_sobre_o_hiv_com_uma_pessoa_adulta_nos_ltimos_2_meses_fora_do_skillz',
      Pre_2__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_como_expressar_a_minha_raiva_sem_ser_violento',
      Pre_3__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_como_superar_os_desafios_que_possa_enfrentar_na_minha_vida',
      Pre_4__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_quais_as_decises_a_tomar_para_alcanar_os_meus_objectivos',
      Pre_5__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.os_rapazes_correm_um_risco_mais_elevado_de_serem_vtimas_de_violncia_do_que_',
      Pre_6__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheco_que_mudanas_ocorrem_no_meu_corpo_durante_a_puberdade',
      Pre_7__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheo_pelo_menos_trs_mtodos_para_evitar_uma_gravidez_indesejada',
      Pre_8__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.os_preservativos_so_o_nico_mtodo_contraceptivo_que_protege_contra_a_gravide',
      Pre_9__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheco_onde_obter_servios_de_apoio_para_mim_ou_outra_pessoa_para_casos_de_',
      Pre_10__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.se_uma_rapariga_inicia_seu_perodo_menstrual_significa_que_est_pronta_para_c',
      Pre_11__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.caso_eu_seja_abusada_sexualmente_prefiro_guard-lo_para_mim_para_evitar_que_',
      Pre_12__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_homem_tem_o_direito_de_ter_sexo_com_a_sua_namorada_mesmo_que_ela_no_o_qu',
      Pre_13__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      Pre_14__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      Pre_15__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.informaria_a_algum_caso_fosse_tocada_por_alguem_de_uma_forma_que_me_deixass',
      Pre_16__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.uma_filha_deve_sempre_respeitar_a_deciso_dos_seus_pais_para_se_casar',
      Pre_17__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_casamento_bem_sucedido__mais_importante_para_as_raparigas_do_que_termina',
      Pre_18__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.eu_no_praticaria_desporto_com_algum_que_tem_hiv',
      Pre_19__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_namorado_pode_ter_boas_razes_para_bater_na_sua_namorada',
      Pre_20__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.no_faz_mal_que_um_rapaz_ameace_bater_na_sua_namorada_se_nunca_a_bater_fisic',
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
      }),
      field('Pre_12__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_12__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_13__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_13__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_14__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_14__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_15__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_15__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_16__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_16__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_17__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_17__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_18__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_18__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_19__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_19__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('Pre_20__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_20__c')); 
        return state.helperFunctions.transform(value);
      }),
      
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
