fn(state => {
  function transform(value) {
    if (!value) return;
    //console.log("value in switch", value.toString().trim().toLowerCase());
    switch (value.toString().trim().toLowerCase()) {
      case 'true':
      case 'yes':
      case 'agree':
      case 'verdade':
      case 'concorda':
      case 'concordo':
        return 1;
      case 'false':
      case 'no':
      case 'disagree':
      case 'discorda':
      case 'discordo':
      case 'falso':
        return 2;
      case 'i_dont_know':
      case `not_sexually_active`:
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

  const formVersion = Object.keys(form).find(key => key.includes('pre_challenge'));

  if (formVersion == 'pre_challenge_ecap_-_pre_-_season_survey_for_athletes') {
    console.log('Skipping upsert for ECAP data');
    return { ...state, formVersion };
  }

  console.log('form version', formVersion);

  const sfFieldMapping = {
    'pre_challenge_south_africa_-_skillz_girl': {
      Pre_1__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_have_an_older_person_in_my_life_i_can_go_to_for_advice_i_have_an_older_pe',
      Pre_2__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_know_how_to_make_a_plan_to_deal_with_the_challenges_i_may_face_in_reachin',
      Pre_3__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
      Pre_4__c: 'form.pre_challenge_south_africa_-_skillz_girl.every_day_i_can_find_something_to_be_grateful_for',
      Pre_5__c:
        'form.pre_challenge_south_africa_-_skillz_girl.having_more_than_one_sexual_partner_increases_my_risk_of_getting_hiv',
      Pre_6__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_can_say_no_to_sex_even_if_my_partner_or_friends_pressure_me_to_have_sex',
      Pre_7__c: 'form.pre_challenge_south_africa_-_skillz_girl.girls_have_a_greater_risk_of_contracting_hiv_than_boys',
      Pre_8__c:
        'form.pre_challenge_south_africa_-_skillz_girl.if_i_am_sexually_active_i_go_to_a_clinic_to_get_protection_from_hivstis_and',
      Pre_9__c: 'form.pre_challenge_south_africa_-_skillz_girl.like_physical_health_we_all_have_mental_health',
      Pre_10__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh',
      Pre_11__c:
        'form.pre_challenge_south_africa_-_skillz_girl.it_is_the_males_responsibility_to_make_decisions_in_a_relationship',
      Pre_12__c:
        'form.pre_challenge_south_africa_-_skillz_girl.if_a_girl_is_sexually_abused_she_can_reduce_her_risk_of_getting_hiv_by_goin',
      Pre_13__c:
        'form.pre_challenge_south_africa_-_skillz_girl.sometimes_a_man_may_have_a_good_reason_to_hit_his_partner',
      Pre_14__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_get_contraception_to_prevent_unwanted_pregnancy',
      Pre_15__c:
        'form.pre_challenge_south_africa_-_skillz_girl.drinking_too_much_alcohol_can_have_serious_negative_consequences_for_mental',
      Pre_16__c:
        'form.pre_challenge_south_africa_-_skillz_girl.if_sexually_active_i_or_my_partner_is_using_a_prevention_method_to_protect_',
      Pre_17__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_know_where_to_go_to_receive_counselling_for_mental_health_challenges',
      Pre_18__c:
        'form.pre_challenge_south_africa_-_skillz_girl.loss_of_interest_in_funenjoyable_activities_is_a_common_sign_of_depression',
      Pre_19__c:
        'form.pre_challenge_south_africa_-_skillz_girl.i_know_at_least_three_methods_to_prevent_an_unwanted_pregnancy',
    },
    'portuguese_pre_challenge_gcr_-_skillz_malaria': {
      Pre_1__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.dormir_dentro_da_rede_mosquiteira_tratada_todas_as_noites_pode_proteger_me_',
      Pre_2__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.posso_esperar_uns_dias_antes_de_fazer_o_teste_de_malria_se_tiver_febres',
      Pre_3__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.um_mdico_tradicionalcurandeiro_pode_me_dar_um_tratamento_para_curar_a_malri',
      Pre_4__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.se_tiver_malria_e_no_for_tratado_posso_transmitir_a_malria_a_algum',
      Pre_5__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.somente_as_mulheres_grvidas_e_as_crianas_menores_de_5_anos__que_precisam_de',
      Pre_6__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.a_malria_pode_matar_se_no_fr_tratada',
      Pre_7__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.a_febre__um_sintoma_da_malria',
      Pre_8__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.eu_me_sinto_bem_conmigo_mesmo',
      Pre_9__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.tenho_algum_na_minha_vida_que_pode_me_dar_bons_conselhos_quando_preciso_de_',
      Pre_10__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_malaria.eu_sei_onde_posso_ter_tratamento_para_malria_na_minha_comunidade',
      Pre_11__c: 'form.portuguese_pre_challenge_gcr_-_skillz_malaria.posso_proteger-me_da_malria',
    },

    'portuguese_pre_challenge_gcr_-_skillz_girl': {
      Pre_1__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.falei_sobre_o_hiv_com_uma_pessoa_adulta_nos_ltimos_2_meses_fora_do_skillz',
      Pre_2__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_como_expressar_a_minha_raiva_sem_ser_violento',
      Pre_3__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_como_superar_os_desafios_que_possa_enfrentar_na_minha_vida',
      Pre_4__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.sei_quais_as_decises_a_tomar_para_alcanar_os_meus_objectivos',
      Pre_5__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.os_rapazes_correm_um_risco_mais_elevado_de_serem_vtimas_de_violncia_do_que_',
      Pre_6__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheco_que_mudanas_ocorrem_no_meu_corpo_durante_a_puberdade',
      Pre_7__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheo_pelo_menos_trs_mtodos_para_evitar_uma_gravidez_indesejada',
      Pre_8__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.os_preservativos_so_o_nico_mtodo_contraceptivo_que_protege_contra_a_gravide',
      Pre_9__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.conheco_onde_obter_servios_de_apoio_para_mim_ou_outra_pessoa_para_casos_de_',
      Pre_10__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.se_uma_rapariga_inicia_seu_perodo_menstrual_significa_que_est_pronta_para_c',
      Pre_11__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.caso_eu_seja_abusada_sexualmente_prefiro_guard-lo_para_mim_para_evitar_que_',
      Pre_12__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_homem_tem_o_direito_de_ter_sexo_com_a_sua_namorada_mesmo_que_ela_no_o_qu',
      Pre_13__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      Pre_14__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
      Pre_15__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.informaria_a_algum_caso_fosse_tocada_por_alguem_de_uma_forma_que_me_deixass',
      Pre_16__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.uma_filha_deve_sempre_respeitar_a_deciso_dos_seus_pais_para_se_casar',
      Pre_17__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_casamento_bem_sucedido__mais_importante_para_as_raparigas_do_que_termina',
      Pre_18__c: 'form.portuguese_pre_challenge_gcr_-_skillz_girl.eu_no_praticaria_desporto_com_algum_que_tem_hiv',
      Pre_19__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.um_namorado_pode_ter_boas_razes_para_bater_na_sua_namorada',
      Pre_20__c:
        'form.portuguese_pre_challenge_gcr_-_skillz_girl.no_faz_mal_que_um_rapaz_ameace_bater_na_sua_namorada_se_nunca_a_bater_fisic',
    },
    'pre_challenge_zambia_-_plus_mh_enhanced_zambia': {
      Pre_1__c: 'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.in_general_i_feel_good_about_myself',
      Pre_2__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_the_skills_and_knowledge_to_avoid_getting_infected_with_another_kind',
      Pre_3__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_important_to_know_why_and_how_i_want_to_tell_someone_my_hiv_status',
      Pre_4__c: 'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_accept_myself_and_my_hiv_status',
      Pre_5__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      Pre_6__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_have_you_been_past_12_months_in_a_sexual_relationship_na_if_not_',
      Pre_7__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
      Pre_8__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_an_older_person_in_my_life_i_can_go_to_for_advice',
      Pre_9__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.there_are_people_i_trust_with_whom_i_can_talk_about_my_status',
      Pre_10__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_two_people_with_hiv_to_have_unprotected_sex_with_each_other',
      Pre_11__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_someone_with_hiv_to_stop_taking_their_arv_as_soon_as_they_st',
      Pre_12__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.when_i_have_a_choice_it_is_important_to_eat_a_variety_of_foods_including_gr',
      Pre_13__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.mental_health_problems_have_nothing_to_do_with_being_lazy_or_weak_and_many_',
      Pre_14__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.art_adherence_is_an_important_part_of_my_overall_health_and_well-being',
      Pre_15__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.the_most_common_illnesses_of_mental_health_are_depression_and_anxiety',
      Pre_16__c:
        'form.pre_challenge_zambia_-_plus_mh_enhanced_zambia.biological_and_social_factors_contribute_to_females_and_males_experiencing_',
    },
    'pre_challenge_nigeria_-_advanced_skills': {
      Pre_1__c:
        'form.pre_challenge_nigeria_-_advanced_skills.i_have_talked_about_hiv_with_an_adult_in_the_past_two_months_outside_skillz',
      Pre_2__c:
        'form.pre_challenge_nigeria_-_advanced_skills.i_have_talked_about_malaria_with_an_adult_in_the_past_two_months_outside_sk',
      Pre_3__c:
        'form.pre_challenge_nigeria_-_advanced_skills.unequal_power_in_relationships_can_contribute_to_the_spread_of_hiv',
      Pre_4__c:
        'form.pre_challenge_nigeria_-_advanced_skills.the_most_effective_way_to_avoid_getting_hiv_is_to_abstain_from_sex',
      Pre_5__c: 'form.pre_challenge_nigeria_-_advanced_skills.malaria_is_spread_by_standing_under_the_hot_sun',
      Pre_6__c: 'form.pre_challenge_nigeria_-_advanced_skills.drinking_alcohol_can_increase_my_risk_of_getting_hiv',
      Pre_7__c:
        'form.pre_challenge_nigeria_-_advanced_skills.sleeping_under_a_mosquito_net_every_night_can_help_protect_me_from_malaria',
      Pre_8__c:
        'form.pre_challenge_nigeria_-_advanced_skills.having_more_than_one_sexual_partner_over_the_same_time_period_increases_my_',
      Pre_9__c:
        'form.pre_challenge_nigeria_-_advanced_skills.it_is_okay_for_someone_with_malaria_to_stop_taking_their_medication_as_soon',
      Pre_10__c:
        'form.pre_challenge_nigeria_-_advanced_skills.i_can_abstain_from_sex_until_i_am_older_even_if_it_is_difficult',
      Pre_11__c:
        'form.pre_challenge_nigeria_-_advanced_skills.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
      Pre_12__c:
        'form.pre_challenge_nigeria_-_advanced_skills.men_should_share_the_work_around_the_house_such_as_cleaning',
      Pre_13__c:
        'form.pre_challenge_nigeria_-_advanced_skills.it_is_the_males_responsibilty_to_make_decisions_in_a_relationship',
      Pre_14__c: 'form.pre_challenge_nigeria_-_advanced_skills.i_can_use_drugs_and_still_easily_reach_my_goals_in_life',
      Pre_15__c:
        'form.pre_challenge_nigeria_-_advanced_skills.when_sick_it_is_better_to_visit_the_herb_seller_than_to_visit_a_doctor_or_a',
      Pre_16__c:
        'form.pre_challenge_nigeria_-_advanced_skills.it_is_okay_to_use_violence_with_my_partner_if_he_or_she_makes_me_angry',
      Pre_17__c:
        'form.pre_challenge_nigeria_-_advanced_skills.i_have_the_power_to_change_gender_expectations_that_i_do_not_agree_with',
    },
    'pre_challenge_zimbabwe_-_skillz_core_zimbabwe': {
      Pre_1__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
      Pre_2__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_girlboy',
      Pre_3__c: 'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_what_i_am_good_at',
      Pre_4__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others',
      Pre_5__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
      Pre_6__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      Pre_7__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_access_sexual_health_services_such_as_sti_and_hiv_testi',
      Pre_8__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      Pre_9__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      Pre_10__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.girls_should_be_obedient_and_should_not_disagree_with_boys',
      Pre_11__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.if_a_girl_gets_pregnant_she_should_drop_out_of_school',
      Pre_12__c: 'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
      Pre_13__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advice_or_when_i_have_a',
      Pre_14__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.if_i_test_positive_for_hiv_there_will_be_someone_who_will_help_and_support_',
      Pre_15__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_i_amsomeone_i_know_is_abused_sexually_physically_and',
      Pre_16__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_someone_touches_me_in_a_way_that_makes_me_uncomforta',
      Pre_17__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      Pre_18__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
      Pre_19__c:
        'form.pre_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her',
    },
    'pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe': {
      Pre_1__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
      Pre_2__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_dont_always_have_to_do_what_people_expect_just_because_i_am_girlboy',
      Pre_3__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
      Pre_4__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_health',
      Pre_5__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      Pre_6__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      Pre_7__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
      Pre_8__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advise_or_when_i_have_a',
      Pre_9__c:
        'form.pre_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
    },
  };

  const pluckSfValue = val => {
    return sfFieldMapping[formVersion][val];
  };

  return { ...state, formVersion, pluckSfValue };
});

fn(state => {
  console.log('here', state.formVersion);
  if (state.formVersion == 'pre_challenge_ecap_-_pre_-_season_survey_for_athletes') {
    console.log('Skipping upsert for ECAP data');
    return state;
  }
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
      //field('Event__c',  toUTF8(dataValue('form.hidden_properties.intervention_name')(state))),
      relationship('Event__r', 'CommCare_Ext_ID__c', dataValue('form.hidden_properties.intervention_name')),
      relationship('Person_Attendance__r', 'Participant_Identification_Number_PID__c', dataValue('form.case.@case_id')),
      // relationship('Person_Attendance__r','CommCare_Ext_ID__c', state => {
      //   return (
      //     dataValue('form.hidden_properties.participant_first_name')(state) +
      //     dataValue('form.hidden_properties.participant_surname')(state)
      //   )
      // }),

      field('CommCare_Ext_ID__c', state => {
        return `${dataValue('form.case.@case_id')(state)}-${scrubEmojis(
          toUTF8(dataValue('form.hidden_properties.intervention_name')(state)),
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
        const value = dataValue(state.pluckSfValue('Pre_1__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_2__c', state => {
        if (state.pluckSfValue('Pre_2__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_2__c'))(state);
        return state.helperFunctions.transform(value);
      }),

      field('Pre_3__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_3__c'))(state);
        return state.helperFunctions.transform(value);
      }),

      field('Pre_4__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_4__c'))(state);
        return state.helperFunctions.transform(value);
      }),

      field('Pre_5__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_5__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_6__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_6__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_7__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_7__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_8__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_8__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_9__c', state => {
        const value = dataValue(state.pluckSfValue('Pre_9__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_10__c', state => {
        if (state.pluckSfValue('Pre_10__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_10__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_11__c', state => {
        if (state.pluckSfValue('Pre_11__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_10__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_12__c', state => {
        if (state.pluckSfValue('Pre_12__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_12__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_13__c', state => {
        if (state.pluckSfValue('Pre_13__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_13__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_14__c', state => {
        if (state.pluckSfValue('Pre_14__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_14__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_15__c', state => {
        if (state.pluckSfValue('Pre_15__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_15__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_16__c', state => {
        if (state.pluckSfValue('Pre_16__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_16__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_17__c', state => {
        if (state.pluckSfValue('Pre_17__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_17__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_18__c', state => {
        if (state.pluckSfValue('Pre_18__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_18__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_19__c', state => {
        if (state.pluckSfValue('Pre_19__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_19__c'))(state);
        return state.helperFunctions.transform(value);
      }),
      field('Pre_20__c', state => {
        if (state.pluckSfValue('Pre_20__c') == null) return undefined;
        const value = dataValue(state.pluckSfValue('Pre_20__c'))(state);
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
