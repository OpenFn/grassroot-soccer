fn(state => {
  function transform(value) {
    if (!value) return;
    switch (value.toString().trim().toLowerCase()) {
      case 'true':
      case 'yes':
      case 'agree':
        return 1;
      case 'false':
      case 'no':
      case 'disagree':
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

  const formVersion = Object.keys(form).find(key => key.startsWith('portuguese_post_challenge'));

  console.log("form version", formVersion);

  const sfFieldMapping = {
    'portuguese_post_challenge_gcr_-_skillz_malaria': {
      post_1__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.dormir_dentro_da_rede_mosquiteira_tratada_todas_as_noites_pode_proteger_me_',
      post_2__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.posso_esperar_uns_dias_antes_de_fazer_o_teste_de_malria_se_tiver_febres',
      post_3__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.um_mdico_tradicionalcurandeiro_pode_me_dar_um_tratamento_para_curar_a_malri',
      post_4__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.se_tiver_malria_e_no_for_tratado_posso_transmitir_a_malria_a_algum',
      post_5__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.somente_as_mulheres_grvidas_e_as_crianas_menores_de_5_anos__que_precisam_de',
      post_6__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.a_malria_pode_matar_se_no_fr_tratada',
      post_7__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.a_febre__um_sintoma_da_malria',
      post_8__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.eu_me_sinto_bem_conmigo_mesmo',
      post_9__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.tenho_algum_na_minha_vida_que_pode_me_dar_bons_conselhos_quando_preciso_de_',
      post_10__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.eu_sei_onde_posso_ter_tratamento_para_malria_na_minha_comunidade',
      post_11__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.posso_proteger-me_da_malria',
    },
    'post_challenge_south_africa_-_skillz_girl': {
      Post_1__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_how_to_overcome_challenges_that_i_may_face_in_my_life',
      post_2__c: 'form.post_challenge_south_africa_-_skillz_girl.in_general_i_wish_i_could_appreciate_myself_more',
      post_3__c: 'form.post_challenge_south_africa_-_skillz_girl.i_would_be_able_to_ask_my_boyfriend_that_i_want_to_use_a_condom',
      post_4__c: 'form.post_challenge_south_africa_-_skillz_girl.i_can_say_no_to_sex_even_if_my_boyfriend_or_friends_pressure_me_to_have_sex',
      post_5__c: 'form.post_challenge_south_africa_-_skillz_girl.if_i_am_sexually_active_i_go_to_a_healthcare_provider_to_get_protection_fro',
      post_6__c: 'form.post_challenge_south_africa_-_skillz_girl.i_dont_always_have_to_do_what_people_expect_just_because_i_am_girl',
      post_7__c: 'form.post_challenge_south_africa_-_skillz_girl.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      post_8__c: 'form.post_challenge_south_africa_-_skillz_girl.it_is_only_the_girls_responsibility_to_avoid_getting_pregnant',
      post_9__c: 'form.post_challenge_south_africa_-_skillz_girl.sometimes_a_man_may_have_a_good_reason_to_hit_his_girlfriend_or_wife',
      post_10__c: 'form.post_challenge_south_africa_-_skillz_girl.it_is_ok_for_a_girl_to_refuse_sex_when_her_boyfriend_wont_use_a_condom',
      post_11__c: 'form.post_challenge_south_africa_-_skillz_girl.it_is_ok_for_a_boy_to_refuse_sex_when_his_girlfriend_doesnt_want_him_to_use',
      post_12__c: 'form.post_challenge_south_africa_-_skillz_girl.i_can_decide_when_is_the_right_time_for_me_to_have_a_baby',
      post_13__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      post_14__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_gender_base',
      post_15__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_get_support_services_for_me_or_someone_else_for_prevention_',
      post_16__c: 'form.post_challenge_south_africa_-_skillz_girl.one_sign_of_pregnancy_is_a_girl_missing_her_period',
      post_17__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_at_least_three_methods_to_avoid_an_unwanted_pregnancy',
      post_18__c: 'form.post_challenge_south_africa_-_skillz_girl.as_a_girl_i_have_a_greater_risk_of_getting_hiv_than_boys_my_age',
      post_19__c: 'form.post_challenge_south_africa_-_skillz_girl.if_a_girl_is_sexually_violated_she_can_reduce_her_risk_of_getting_hiv_by_ta',
      post_20__c: 'form.post_challenge_south_africa_-_skillz_girl.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
    },
    'portuguese_post_challenge_gcr_-_skillz_girl': {
      post_1__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.falei_sobre_o_hiv_com_uma_pessoa_adulta_nos_ltimos_2_meses_fora_do_skillz',
      post_2__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_como_expressar_a_minha_raiva_sem_ser_violento',
      post_3__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_como_superar_os_desafios_que_possa_enfrentar_na_minha_vida',
      post_4__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_quais_as_decises_a_tomar_para_alcanar_os_meus_objectivos',
      post_5__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.os_rapazes_correm_um_risco_mais_elevado_de_serem_vtimas_de_violncia_do_que_',
      post_6__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheco_que_mudanas_ocorrem_no_meu_corpo_durante_a_puberdade',
      post_7__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheo_pelo_menos_trs_mtodos_para_evitar_uma_gravidez_indesejada',
      post_8__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.os_preservativos_so_o_nico_mtodo_contraceptivo_que_protege_contra_a_gravide',
      post_9__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheco_onde_obter_servios_de_apoio_para_mim_ou_outra_pessoa_para_casos_de_',
      post_10__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.se_uma_rapariga_inicia_seu_perodo_menstrual_significa_que_est_pronta_para_c',
      post_11__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.caso_eu_seja_abusada_sexualmente_prefiro_guard-lo_para_mim_para_evitar_que_',
      post_12__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_homem_tem_o_direito_de_ter_sexo_com_a_sua_namorada_mesmo_que_ela_no_o_qu',
      post_13__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      post_14__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      post_15__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.informaria_a_algum_caso_fosse_tocada_por_alguem_de_uma_forma_que_me_deixass',
      post_16__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.uma_filha_deve_sempre_respeitar_a_deciso_dos_seus_pais_para_se_casar',
      post_17__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_casamento_bem_sucedido__mais_importante_para_as_raparigas_do_que_termina',
      post_18__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.eu_no_praticaria_desporto_com_algum_que_tem_hiv',
      post_19__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_namorado_pode_ter_boas_razes_para_bater_na_sua_namorada',
      post_20__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.no_faz_mal_que_um_rapaz_ameace_bater_na_sua_namorada_se_nunca_a_bater_fisic',
    },
    'form.post_challenge_zambia_-_plus_mh_enhanced_zambia': {
      post_1__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.in_general_i_feel_good_about_myself',
      post_2__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_the_skills_and_knowledge_to_avoid_getting_infected_with_another_kind',
      post_3__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_important_to_know_why_and_how_i_want_to_tell_someone_my_hiv_status',
      post_4__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_accept_myself_and_my_hiv_status',
      post_5__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      post_6__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_have_you_been_past_12_months_in_a_sexual_relationship_na_if_not_',
      post_7__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
      post_8__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_an_older_person_in_my_life_i_can_go_to_for_advice',
      post_9__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.there_are_people_i_trust_with_whom_i_can_talk_about_my_status',
      post_10__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_two_people_with_hiv_to_have_unprotected_sex_with_each_other',
      post_11__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_someone_with_hiv_to_stop_taking_their_arv_as_soon_as_they_st',
      post_12__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.when_i_have_a_choice_it_is_important_to_eat_a_variety_of_foods_including_gr',
      post_13__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.mental_health_problems_have_nothing_to_do_with_being_lazy_or_weak_and_many_',
      post_14__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.art_adherence_is_an_important_part_of_my_overall_health_and_well-being',
      post_15__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.the_most_common_illnesses_of_mental_health_are_depression_and_anxiety',
      post_16__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.biological_and_social_factors_contribute_to_females_and_males_experiencing_',
    },
    'post_challenge_nigeria_-_advanced_skills':{
      post_1__c: 'form.post_challenge_nigeria_-_advanced_skills.i_have_talked_about_hiv_with_an_adult_in_the_past_two_months_outside_skillz',
      post_2__c: '',
      post_3__c: 'form.post_challenge_nigeria_-_advanced_skills.unequal_power_in_relationships_can_contribute_to_the_spread_of_hiv',
      post_4__c: 'form.post_challenge_nigeria_-_advanced_skills.the_most_effective_way_to_avoid_getting_hiv_is_to_abstain_from_sex',
      post_5__c: 'form.post_challenge_nigeria_-_advanced_skills.malaria_is_spread_by_standing_under_the_hot_sun',
      post_6__c: 'form.post_challenge_nigeria_-_advanced_skills.drinking_alcohol_can_increase_my_risk_of_getting_hiv',
      post_7__c: 'form.post_challenge_nigeria_-_advanced_skills.sleeping_under_a_mosquito_net_every_night_can_help_protect_me_from_malaria',
      post_8__c: 'form.post_challenge_nigeria_-_advanced_skills.having_more_than_one_sexual_partner_over_the_same_time_period_increases_my_',
      post_9__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_okay_for_someone_with_malaria_to_stop_taking_their_medication_as_soon',
      post_10__c: 'form.post_challenge_nigeria_-_advanced_skills.i_can_abstain_from_sex_until_i_am_older_even_if_it_is_difficult',
      post_11__c: 'form.post_challenge_nigeria_-_advanced_skills.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
      post_12__c: 'form.post_challenge_nigeria_-_advanced_skills.men_should_share_the_work_around_the_house_such_as_cleaning',
      post_13__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_the_males_responsibilty_to_make_decisions_in_a_relationship',
      post_14__c: 'form.post_challenge_nigeria_-_advanced_skills.i_can_use_drugs_and_still_easily_reach_my_goals_in_life',
      post_15__c: 'form.post_challenge_nigeria_-_advanced_skills.when_sick_it_is_better_to_visit_the_herb_seller_than_to_visit_a_doctor_or_a',
      post_16__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_okay_to_use_violence_with_my_partner_if_he_or_she_makes_me_angry',
      post_17__c: 'form.post_challenge_nigeria_-_advanced_skills.i_have_the_power_to_change_gender_expectations_that_i_do_not_agree_with',
    },
    'post_challenge_zimbabwe_-_skillz_core_zimbabwe': {
      post_1__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
      post_2__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_girlboy',
      post_3__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_what_i_am_good_at',
      post_4__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others',
      post_5__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
      post_6__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      post_7__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_access_sexual_health_services_such_as_sti_and_hiv_testi',
      post_8__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      post_9__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      post_10__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.girls_should_be_obedient_and_should_not_disagree_with_boys',
      post_11__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.if_a_girl_gets_pregnant_she_should_drop_out_of_school',
      post_12__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
      post_13__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advice_or_when_i_have_a',
      post_14__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.if_i_test_positive_for_hiv_there_will_be_someone_who_will_help_and_support_',
      post_15__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_i_amsomeone_i_know_is_abused_sexually_physically_and',
      post_16__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_someone_touches_me_in_a_way_that_makes_me_uncomforta',
      post_17__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      post_18__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
      post_19__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her',
    },
    'post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe': {
      post_1__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
      post_2__c: '',
      post_3__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
      post_4__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_health',
      post_5__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      post_6__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      post_7__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
      post_8__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advise_or_when_i_have_a',
      post_9__c: 'form.post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
    }
    
  };

  const pluckSfValue = val => {
    return sfFieldMapping[formVersion][val];
  };

  return { ...state, pluckSfValue };
});

fn(state => {
  console.log(state.pluckSfValue('Post_1__c'));
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

      field('CommCare_Ext_ID__c', state => {
        const value =
          dataValue('form.case.@case_id')(state) +
          '-' +
          dataValue('form.hidden_properties.intervention_name')(state).replace(/\//gi, '');
        return scrubEmojis(value, '');
      }),

      //relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
      relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),
      field('post_Post_Completed__c', state => {
        var done = dataValue('form.hidden_properties.post_questionnaire_complete')(state);
        return done === 'Yes' ? true : done === 'No' ? false : undefined;
      }),
      field('Date_Post_Administered__c', dataValue('form.date')),
      field('Post_1__c', state => {
        const value = dataValue(state.pluckSfValue('Post_1__c'));
        return state.helperFunctions.transform(value);
      }),
     field('post_2__c', state => {
        const value = dataValue(state.pluckSfValue('post_2__c')); 
        return state.helperFunctions.transform(value);
      }),
      
      field('post_3__c', state => {
        const value = dataValue(state.pluckSfValue('post_3__c')); 
        return state.helperFunctions.transform(value);
      }),
      
      field('post_4__c', state => {
        const value = dataValue(state.pluckSfValue('post_4__c')); 
        return state.helperFunctions.transform(value);
      }),
      
      field('post_5__c', state => {
        const value = dataValue(state.pluckSfValue('post_5__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_6__c', state => {
        const value = dataValue(state.pluckSfValue('post_6__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_7__c', state => {
        const value = dataValue(state.pluckSfValue('post_7__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_8__c', state => {
        const value = dataValue(state.pluckSfValue('post_8__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_9__c', state => {
        const value = dataValue(state.pluckSfValue('post_9__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_10__c', state => {
        const value = dataValue(state.pluckSfValue('post_10__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_11__c', state => {
        const value = dataValue(state.pluckSfValue('post_10__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_12__c', state => {
        const value = dataValue(state.pluckSfValue('post_12__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_13__c', state => {
        const value = dataValue(state.pluckSfValue('post_13__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_14__c', state => {
        const value = dataValue(state.pluckSfValue('post_14__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_15__c', state => {
        const value = dataValue(state.pluckSfValue('post_15__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_16__c', state => {
        const value = dataValue(state.pluckSfValue('post_16__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_17__c', state => {
        const value = dataValue(state.pluckSfValue('post_17__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_18__c', state => {
        const value = dataValue(state.pluckSfValue('post_18__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_19__c', state => {
        const value = dataValue(state.pluckSfValue('post_19__c')); 
        return state.helperFunctions.transform(value);
      }),
      field('post_20__c', state => {
        const value = dataValue(state.pluckSfValue('post_20__c')); 
        return state.helperFunctions.transform(value);
      })
    )
  )(state);
});

//Removing mapping... need case_id to upsert Events. Date_of_Post__c update should be handled on the SF side.
/*upsert(
  'Event__c',
  'CommCare_Ext_ID__c',
  fields(
    field('CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
    field('Date_of_Post__c', dataValue('form.date')),
  )
);*/