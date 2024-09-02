//test  
fn(state => {
    function transform(value) {
      if (!value) return;
      switch (value.toString().trim().toLowerCase()) {
        case 'true':
        case 'yes':
        case 'agree':
        case 'concordo':
        case 'verdade':
        case 'copy-1-of-yes':
          return 1;
        case 'false':
        case 'no':
        case 'disagree':
        case 'discordo':
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
  
    const formVersion = Object.keys(form).find(key => key.includes('challenge'));
  
    console.log("form version", formVersion);
  
    const sfFieldMapping = {
      'portuguese_post_challenge_gcr_-_skillz_malaria': {
        Post_1__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.dormir_dentro_da_rede_mosquiteira_tratada_todas_as_noites_pode_proteger_me_',
        Post_2__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.posso_esperar_uns_dias_antes_de_fazer_o_teste_de_malria_se_tiver_febres',
        Post_3__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.um_mdico_tradicionalcurandeiro_pode_me_dar_um_tratamento_para_curar_a_malri',
        Post_4__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.se_tiver_malria_e_no_for_tratado_posso_transmitir_a_malria_a_algum',
        Post_5__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.somente_as_mulheres_grvidas_e_as_crianas_menores_de_5_anos__que_precisam_de',
        Post_6__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.a_malria_pode_matar_se_no_fr_tratada',
        Post_7__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.a_febre__um_sintoma_da_malria',
        Post_8__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.eu_me_sinto_bem_conmigo_mesmo',
        Post_9__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.tenho_algum_na_minha_vida_que_pode_me_dar_bons_conselhos_quando_preciso_de_',
        Post_10__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.eu_sei_onde_posso_ter_tratamento_para_malria_na_minha_comunidade',
        Post_11__c: 'form.portuguese_post_challenge_gcr_-_skillz_malaria.posso_proteger-me_da_malria',
      },
      
      'post_challenge_south_africa_-_skillz_girl': {
          Post_1__c: 'form.post_challenge_south_africa_-_skillz_girl.i_have_an_older_person_in_my_life_i_can_go_to_for_advice_i_have_an_older_pe',
          Post_2__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_how_to_make_a_plan_to_deal_with_the_challenges_i_may_face_in_reachin',
          Post_3__c: 'form.post_challenge_south_africa_-_skillz_girl.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
          Post_4__c: 'form.post_challenge_south_africa_-_skillz_girl.every_day_i_can_find_something_to_be_grateful_for',
          Post_5__c: 'form.post_challenge_south_africa_-_skillz_girl.having_more_than_one_sexual_partner_increases_my_risk_of_getting_hiv',
          Post_6__c: 'form.post_challenge_south_africa_-_skillz_girl.i_can_say_no_to_sex_even_if_my_partner_or_friends_pressure_me_to_have_sex',
          Post_7__c: 'form.post_challenge_south_africa_-_skillz_girl.girls_have_a_greater_risk_of_contracting_hiv_than_boys',
          Post_8__c: 'form.post_challenge_south_africa_-_skillz_girl.if_i_am_sexually_active_i_go_to_a_clinic_to_get_protection_from_hivstis_and',
          Post_9__c: 'form.post_challenge_south_africa_-_skillz_girl.like_physical_health_we_all_have_mental_health',
          Post_10__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh',
          Post_11__c: 'form.post_challenge_south_africa_-_skillz_girl.it_is_the_males_responsibility_to_make_decisions_in_a_relationship',
          Post_12__c: 'form.post_challenge_south_africa_-_skillz_girl.if_a_girl_is_sexually_abused_she_can_reduce_her_risk_of_getting_hiv_by_goin',
          Post_13__c: 'form.post_challenge_south_africa_-_skillz_girl.sometimes_a_man_may_have_a_good_reason_to_hit_his_partner',
          Post_14__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_get_contraception_to_prevent_unwanted_pregnancy',
          Post_15__c: 'form.post_challenge_south_africa_-_skillz_girl.drinking_too_much_alcohol_can_have_serious_negative_consequences_for_mental',
          Post_16__c: 'form.post_challenge_south_africa_-_skillz_girl.if_sexually_active_i_or_my_partner_is_using_a_prevention_method_to_protect_',
          Post_17__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_where_to_go_to_receive_counselling_for_mental_health_challenges',
          Post_18__c: 'form.post_challenge_south_africa_-_skillz_girl.loss_of_interest_in_funenjoyable_activities_is_a_common_sign_of_depression',
          Post_19__c: 'form.post_challenge_south_africa_-_skillz_girl.i_know_at_least_three_methods_to_prevent_an_unwanted_pregnancy',
    },
      'portuguese_post_challenge_gcr_-_skillz_girl': {
        Post_1__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.falei_sobre_o_hiv_com_uma_pessoa_adulta_nos_ltimos_2_meses_fora_do_skillz',
        Post_2__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_como_expressar_a_minha_raiva_sem_ser_violento',
        Post_3__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_como_superar_os_desafios_que_possa_enfrentar_na_minha_vida',
        Post_4__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.sei_quais_as_decises_a_tomar_para_alcanar_os_meus_objectivos',
        Post_5__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.os_rapazes_correm_um_risco_mais_elevado_de_serem_vtimas_de_violncia_do_que_',
        Post_6__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheco_que_mudanas_ocorrem_no_meu_corpo_durante_a_puberdade',
        Post_7__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheo_pelo_menos_trs_mtodos_para_evitar_uma_gravidez_indesejada',
        Post_8__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.os_preservativos_so_o_nico_mtodo_contraceptivo_que_protege_contra_a_gravide',
        Post_9__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.conheco_onde_obter_servios_de_apoio_para_mim_ou_outra_pessoa_para_casos_de_',
        Post_10__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.se_uma_rapariga_inicia_seu_perodo_menstrual_significa_que_est_pronta_para_c',
        Post_11__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.caso_eu_seja_abusada_sexualmente_prefiro_guard-lo_para_mim_para_evitar_que_',
        Post_12__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_homem_tem_o_direito_de_ter_sexo_com_a_sua_namorada_mesmo_que_ela_no_o_qu',
        Post_13__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
        Post_14__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.pessoas_com_problemas_de_sade_mental_so_apenas_confusas_ou_loucas',
        Post_15__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.informaria_a_algum_caso_fosse_tocada_por_alguem_de_uma_forma_que_me_deixass',
        Post_16__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.uma_filha_deve_sempre_respeitar_a_deciso_dos_seus_pais_para_se_casar',
        Post_17__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_casamento_bem_sucedido__mais_importante_para_as_raparigas_do_que_termina',
        Post_18__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.eu_no_praticaria_desporto_com_algum_que_tem_hiv',
        Post_19__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.um_namorado_pode_ter_boas_razes_para_bater_na_sua_namorada',
        Post_20__c: 'form.portuguese_post_challenge_gcr_-_skillz_girl.no_faz_mal_que_um_rapaz_ameace_bater_na_sua_namorada_se_nunca_a_bater_fisic',
      },
      'post_challenge_zambia_-_plus_mh_enhanced_zambia': {
        Post_1__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.in_general_i_feel_good_about_myself',
        Post_2__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_the_skills_and_knowledge_to_avoid_getting_infected_with_another_kind',
        Post_3__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_important_to_know_why_and_how_i_want_to_tell_someone_my_hiv_status',
        Post_4__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_accept_myself_and_my_hiv_status',
        Post_5__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
        Post_6__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_have_you_been_past_12_months_in_a_sexual_relationship_na_if_not_',
        Post_7__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
        Post_8__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.i_have_an_older_person_in_my_life_i_can_go_to_for_advice',
        Post_9__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.there_are_people_i_trust_with_whom_i_can_talk_about_my_status',
        Post_10__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_two_people_with_hiv_to_have_unprotected_sex_with_each_other',
        Post_11__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.it_is_okay_for_someone_with_hiv_to_stop_taking_their_arv_as_soon_as_they_st',
        Post_12__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.when_i_have_a_choice_it_is_important_to_eat_a_variety_of_foods_including_gr',
        Post_13__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.mental_health_problems_have_nothing_to_do_with_being_lazy_or_weak_and_many_',
        Post_14__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.art_adherence_is_an_important_part_of_my_overall_health_and_well-being',
        Post_15__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.the_most_common_illnesses_of_mental_health_are_depression_and_anxiety',
        Post_16__c: 'form.post_challenge_zambia_-_plus_mh_enhanced_zambia.biological_and_social_factors_contribute_to_females_and_males_experiencing_',
      },
      'post_challenge_nigeria_-_advanced_skills':{
        Post_1__c: 'form.post_challenge_nigeria_-_advanced_skills.i_have_talked_about_hiv_with_an_adult_in_the_past_two_months_outside_skillz',
        Post_2__c: 'form.post_challenge_nigeria_-_advanced_skills.i_have_talked_about_malaria_with_an_adult_in_the_past_two_months_outside_sk',
        Post_3__c: 'form.post_challenge_nigeria_-_advanced_skills.unequal_power_in_relationships_can_contribute_to_the_spread_of_hiv',
        Post_4__c: 'form.post_challenge_nigeria_-_advanced_skills.the_most_effective_way_to_avoid_getting_hiv_is_to_abstain_from_sex',
        Post_5__c: 'form.post_challenge_nigeria_-_advanced_skills.malaria_is_spread_by_standing_under_the_hot_sun',
        Post_6__c: 'form.post_challenge_nigeria_-_advanced_skills.drinking_alcohol_can_increase_my_risk_of_getting_hiv',
        Post_7__c: 'form.post_challenge_nigeria_-_advanced_skills.sleeping_under_a_mosquito_net_every_night_can_help_protect_me_from_malaria',
        Post_8__c: 'form.post_challenge_nigeria_-_advanced_skills.having_more_than_one_sexual_partner_over_the_same_time_period_increases_my_',
        Post_9__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_okay_for_someone_with_malaria_to_stop_taking_their_medication_as_soon',
        Post_10__c: 'form.post_challenge_nigeria_-_advanced_skills.i_can_abstain_from_sex_until_i_am_older_even_if_it_is_difficult',
        Post_11__c: 'form.post_challenge_nigeria_-_advanced_skills.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
        Post_12__c: 'form.post_challenge_nigeria_-_advanced_skills.men_should_share_the_work_around_the_house_such_as_cleaning',
        Post_13__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_the_males_responsibilty_to_make_decisions_in_a_relationship',
        Post_14__c: 'form.post_challenge_nigeria_-_advanced_skills.i_can_use_drugs_and_still_easily_reach_my_goals_in_life',
        Post_15__c: 'form.post_challenge_nigeria_-_advanced_skills.when_sick_it_is_better_to_visit_the_herb_seller_than_to_visit_a_doctor_or_a',
        Post_16__c: 'form.post_challenge_nigeria_-_advanced_skills.it_is_okay_to_use_violence_with_my_partner_if_he_or_she_makes_me_angry',
        Post_17__c: 'form.post_challenge_nigeria_-_advanced_skills.i_have_the_power_to_change_gender_expectations_that_i_do_not_agree_with',
      },
      'post_challenge_zimbabwe_-_skillz_core_zimbabwe': {
        Post_1__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
        Post_2__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_girlboy',
        Post_3__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_what_i_am_good_at',
        Post_4__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others',
        Post_5__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
        Post_6__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
        Post_7__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_access_sexual_health_services_such_as_sti_and_hiv_testi',
        Post_8__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
        Post_9__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
        Post_10__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.girls_should_be_obedient_and_should_not_disagree_with_boys',
        Post_11__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.if_a_girl_gets_pregnant_she_should_drop_out_of_school',
        Post_12__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
        Post_13__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advice_or_when_i_have_a',
        Post_14__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.if_i_test_positive_for_hiv_there_will_be_someone_who_will_help_and_support_',
        Post_15__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_i_amsomeone_i_know_is_abused_sexually_physically_and',
        Post_16__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_who_to_go_to_if_someone_touches_me_in_a_way_that_makes_me_uncomforta',
        Post_17__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
        Post_18__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
        Post_19__c: 'form.post_challenge_zimbabwe_-_skillz_core_zimbabwe.i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her',
      },
      'copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe': {
        Post_1__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_what_decisions_to_make_to_achieve_my_goals',
        Post_2__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_dont_always_have_to_do_what_people_expect_just_because_i_am_girlboy',
        Post_3__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
        Post_4__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_can_make_my_own_informed_decisions_about_my_sexual_health',
        Post_5__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
        Post_6__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
        Post_7__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.my_skillz_coach_helps_me_to_be_a_better_person',
        Post_8__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advise_or_when_i_have_a',
        Post_9__c: 'form.copy-1-of-post_challenge_zimbabwe_-_virtual_skillz_core_zimbabwe.copy-1-of-i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      },
       'post_challenge_skillz_girl_-_zam_311': {
      Post_1__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_what_i_am_good_at',
      Post_2__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_how_to_overcome_challenges_that_i_may_face_in_my_life',
      Post_3__c: 'form.post_challenge_skillz_girl_-_zam_311.i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_girl',
      Post_4__c: 'form.post_challenge_skillz_girl_-_zam_311.i_would_be_able_to_ask_my_boyfriend_that_i_want_to_use_a_condom',
      Post_5__c: 'form.post_challenge_skillz_girl_-_zam_311.i_can_say_no_to_sex_even_if_my_boyfriend_or_friends_pressure_me_to_have_sex',
      Post_6__c: 'form.post_challenge_skillz_girl_-_zam_311.if_i_am_sexually_active_i_go_to_a_healthcare_provider_to_get_protection_fro',
      Post_7__c: 'form.post_challenge_skillz_girl_-_zam_311.i_can_make_my_own_informed_decisions_about_my_sexual_healthcare',
      Post_8__c: 'form.post_challenge_skillz_girl_-_zam_311.it_is_only_the_girls_responsibility_to_avoid_getting_pregnant',
      Post_9__c: 'form.post_challenge_skillz_girl_-_zam_311.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      Post_10__c: 'form.post_challenge_skillz_girl_-_zam_311.sometimes_a_man_may_have_a_good_reason_to_hit_his_girlfriend_or_wife',
      Post_11__c: 'form.post_challenge_skillz_girl_-_zam_311.a_successful_marriage_is_more_important_to_girls_than_completing_school',
      Post_12__c: 'form.post_challenge_skillz_girl_-_zam_311.a_daughter_should_always_respect_her_parents_decision_for_her_to_get_marrie',
      Post_13__c: 'form.post_challenge_skillz_girl_-_zam_311.i_can_decide_when_is_the_right_time_for_me_to_have_a_baby',
      Post_14__c: 'form.post_challenge_skillz_girl_-_zam_311.i_have_someone_in_my_life_i_can_turn_to_when_i_need_advice_or_when_i_have_a',
      Post_15__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_where_to_get_support_services_for_me_or_someone_else_for_hiv-related',
      Post_16__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_where_to_get_support_services_for_me_or_someone_else_for_gender_base',
      Post_17__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_where_to_get_support_services_for_me_or_someone_else_for_prevention_',
      Post_18__c: 'form.post_challenge_skillz_girl_-_zam_311.one_sign_of_pregnancy_is_a_girl_missing_her_period',
      Post_19__c: 'form.post_challenge_skillz_girl_-_zam_311.i_know_at_least_three_methods_to_avoid_an_unwanted_pregnancy',
      Post_20__c: 'form.post_challenge_skillz_girl_-_zam_311.are_you_or_your_boyfriend_currently_using_any_contraceptive_method',
    },
    'post_challenge_skillz_core_zambia_211': {
      Post_1__c: 'form.post_challenge_skillz_core_zambia_211.question1',
      Post_2__c: 'form.post_challenge_skillz_core_zambia_211.i_know_how_to_overcome_challenges_i_may_have_in_my_life',
      Post_3__c: 'form.post_challenge_skillz_core_zambia_211.i_can_make_my_own_decisions_no_matter_how_much_pressure_i_get_from_others',
      Post_4__c: 'form.post_challenge_skillz_core_zambia_211.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      Post_5__c: 'form.post_challenge_skillz_core_zambia_211.i_dont_always_have_to_do_what_people_expect_because_i_am_a_boygirl',
      Post_6__c: 'form.post_challenge_skillz_core_zambia_211.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      Post_7__c: 'form.post_challenge_skillz_core_zambia_211.girls_should_not_disagree_with_boys',
      Post_8__c: 'form.post_challenge_skillz_core_zambia_211.if_a_girl_gets_pregnant_she_should_drop_out_of_school',
      Post_9__c: 'form.post_challenge_skillz_core_zambia_211.i_have_the_right_to_say_no_to_sex_no_matter_who_asks_me',
      Post_10__c: 'form.post_challenge_skillz_core_zambia_211.i_have_an_older_person_in_my_life_i_can_go_to_for_advice',
      Post_11__c: 'form.post_challenge_skillz_core_zambia_211.if_i_test_positive_for_hivthere_will_be_someone_who_will_help_and_support_m',
      Post_12__c: 'form.post_challenge_skillz_core_zambia_211.male_circumcision_reduces_a_males_risk_of_getting_hiv',
      Post_13__c: 'form.post_challenge_skillz_core_zambia_211.drinking_alcohol_can_increase_my_risk_of_getting_hiv',
      Post_14__c: 'form.post_challenge_skillz_core_zambia_211.i_know_where_to_get_support_services_for_me_or_someone_elsefor_hiv_-_relate',
      Post_15__c: 'form.post_challenge_skillz_core_zambia_211.i_know_where_to_get_support_services_for_me_or_someone_elsefor_abuse',
      Post_16__c: 'form.post_challenge_skillz_core_zambia_211.i_have_the_right_to_access_sexual_health_servicessuch_as_sti_and_hiv_testin',
      Post_17__c: 'form.post_challenge_skillz_core_zambia_211.one_sign_of_pregnancy_is_a_girl_missing_her_period',
      Post_18__c: 'form.post_challenge_skillz_core_zambia_211.i_would_say_no_to_playing_sport_with_someone_who_has_hiv',
      Post_19__c: 'form.post_challenge_skillz_core_zambia_211.i_can_tell_whether_someone_has_hiv_by_looking_at_him_or_her',
      Post_20__c: 'form.post_challenge_skillz_core_zambia_211.i_know_what_decisions_to_make_to_achieve_my_goals',
    },
    'post_challenge_skillz_boy_zambia110': {
      Post_1__c: 'form.post_challenge_skillz_boy_zambia110.in_general_i_feel_good_about_myself',
      Post_2__c: 'form.post_challenge_skillz_boy_zambia110.i_would_be_able_to_ask_my_girlfriend_that_i_want_to_use_a_condom',
      Post_3__c: 'form.post_challenge_skillz_boy_zambia110.i_dont_always_have_to_do_what_people_expect_just_because_i_am_a_boy',
      Post_4__c: 'form.post_challenge_skillz_boy_zambia110.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
      Post_5__c: 'form.post_challenge_skillz_boy_zambia110.it_is_more_important_for_boys_to_be_educated_than_girls',
      Post_6__c: 'form.post_challenge_skillz_boy_zambia110.men_are_better_leaders_than_women',
      Post_7__c: 'form.post_challenge_skillz_boy_zambia110.a_man_has_the_right_to_have_sex_with_his_girlfriend_even_if_she_doesnt_want',
      Post_8__c: 'form.post_challenge_skillz_boy_zambia110.it_is_only_the_girls_responsibility_to_avoid_getting_pregnant',
      Post_9__c: 'form.post_challenge_skillz_boy_zambia110.it_is_okay_for_a_boyfriend_to_threaten_to_hit_his_girlfriend_if_he_never_hi',
      Post_10__c: 'form.post_challenge_skillz_boy_zambia110.i_can_say_no_to_sex_even_if_my_friends_or_girlfriend_pressure_me_to_have_se',
      Post_11__c: 'form.post_challenge_skillz_boy_zambia110.people_who_abuse_alcohol_are_more_likely_to_engage_in_risky_sexual_behaviou',
      Post_12__c: 'form.post_challenge_skillz_boy_zambia110.i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh',
      Post_13__c: 'form.post_challenge_skillz_boy_zambia110.i_have_a_friend_that_i_can_go_to_for_advice_when_i_have_a_problem',
      Post_14__c: 'form.post_challenge_skillz_boy_zambia110.i_have_the_right_to_access_sexual_health_services_such_as_hiv_and_sti_testi',
      Post_15__c: 'form.post_challenge_skillz_boy_zambia110.i_know_where_to_access_sexual_health_services_such_as_sti_and_hiv_testing',
      Post_16__c: 'form.post_challenge_skillz_boy_zambia110.before_making_a_decision_i_think_about_how_it_can_affect_me_or_others',
      Post_17__c: 'form.post_challenge_skillz_boy_zambia110.i_know_how_to_express_my_anger_without_being_violent_such_as_hitting_kickin',
      Post_18__c: 'form.post_challenge_skillz_boy_zambia110.male_circumcision_reduces_a_males_risk_of_getting_hiv',
      Post_19__c: 'form.post_challenge_skillz_boy_zambia110.i_know_how_to_correctly_use_a_male_condom',
      Post_20__c: 'form.post_challenge_skillz_boy_zambia110.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
    },
    'post_challenge_skillz_guyz_mh_-_sa_100':{
      Post_1__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_have_to_be_respectful_communicate_and_take_action_to_be_a_role_model_in_m',
      Post_2__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_have_skills_that_help_me_bounce_back_from_difficult_situations',
      Post_3__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_can_identify_my_strengths_or_things_that_i_am_good_at',
      Post_4__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.when_i_am_angry_i_know_how_to_avoid_using_violent_behaviour',
      Post_5__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.when_i_express_my_feelings_clearly_people_understand_me_better',
      Post_6__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_know_what_changes_to_expect_in_my_body_during_puberty',
      Post_7__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.sadness_and_a_loss_of_pleasure_in_things_you_enjoy_are_common_symptoms_of_d',
      Post_8__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_know_where_to_access_health_services_and_mental_health_services',
      Post_9__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_will_share_accurate_information_about_mental_health_services_to_avoid_sti',
      Post_10__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.society_expects_boys_and_girls_to_deal_with_their_emotions_differently',
      Post_11__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.men_should_share_the_work_around_the_house_such_as_cleaning_and_taking_care',
      Post_12__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.its_okay_for_a_guy_to_beat_a_girl_when_there_is_a_misunderstanding',
      Post_13__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_should_respect_the_rights_of_others_such_as_their_right_to_their_own_opin',
      Post_14__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_feel_confident_setting_my_goals',
      Post_15__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.stress_is_a_normal_part_of_life',
      Post_16__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.deep_breathing_is_a_healthy_way_to_deal_with_difficult_and_stressful_situat',
      Post_17__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.there_are_people_i_trust_with_whom_i_can_talk_to_about_my_mental_health',
      Post_18__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_have_no_fear_or_shame_when_accessing_health_services_or_mental_health_ser',
      Post_19__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.having_more_than_one_sexual_partner_over_the_same_time_period_increases_my_',
      Post_20__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.it_is_the_males_responsibility_to_make_decisions_in_a_relationship',
      Post_21__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_can_stand_up_to_peer_pressure_when_i_have_to',
      Post_22__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_should_use_a_condom_even_if_my_girlfriend_is_on_another_form_of_birth_con',
      Post_23__c: 'form.post_challenge_skillz_guyz_mh_-_sa_100.i_know_where_to_go_for_support_if_i_or_someone_i_know_abuses_alcohol',
    },
      'post_challenge_mindskillz-_zambia_100': {
        Post_1__c:'form.post_challenge_mindskillz-_zambia_100.when_i_express_my_feelings_clearly_people_understand_me_better',
        Post_2__c:'form.post_challenge_mindskillz-_zambia_100.i_have_skills_that_help_me_bounce_back_from_difficult_situations',
        Post_3__c:'form.post_challenge_mindskillz-_zambia_100.stress_is_a_normal_part_of_life',
        Post_4__c:'form.post_challenge_mindskillz-_zambia_100.i_can_reach_my_goals_in_life',
        Post_5__c:'form.post_challenge_mindskillz-_zambia_100.if_i_have_a_problem_i_have_someone_in_my_life_i_can_go_to_for_support',
        Post_6__c:'form.post_challenge_mindskillz-_zambia_100.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
        Post_7__c:'form.post_challenge_mindskillz-_zambia_100.self_control_helps_you_make_smart_decisions_when_you_are_angry_or_upset',
        Post_8__c:'form.post_challenge_mindskillz-_zambia_100.society_expects_boys_and_girls_to_deal_with_their_emotions_differently',
        Post_9__c:'form.post_challenge_mindskillz-_zambia_100.i_know_how_to_express_my_anger_without_being_violent',
        Post_10__c:'form.post_challenge_mindskillz-_zambia_100.listening_carefully_to_others_is_an_important_communication_skill',
        Post_11__c:'form.post_challenge_mindskillz-_zambia_100.drinking_too_much_alcohol_can_have_serious_negative_consequences_for_mental',
        Post_12__c:'form.post_challenge_mindskillz-_zambia_100.i_can_understand_how_others_are_feeling_and_be_sensitive_to_their_emotions',
        Post_13__c:'form.post_challenge_mindskillz-_zambia_100.i_am_confident_that_i_know_where_to_seek_information_about_mental_illness',
        Post_14__c:'form.post_challenge_mindskillz-_zambia_100.i_am_confident_using_the_computer_or_telephone_to_seek_information_about_me',
        Post_15__c:'form.post_challenge_mindskillz-_zambia_100.i_am_confident_attending_face_to_face_appointments_to_seek_information_abou',
        Post_16__c:'form.post_challenge_mindskillz-_zambia_100.i_am_confident_i_have_access_to_resources_eg_doctor_internet_friends_that_i',
        Post_17__c:'form.post_challenge_mindskillz-_zambia_100.people_with_mental_illness_could_snap_out_of_it_if_they_wanted',
        Post_18__c:'form.post_challenge_mindskillz-_zambia_100.a_mental_illness_is_a_sign_of_personal_weakness',
        Post_19__c:'form.post_challenge_mindskillz-_zambia_100.a_mental_illness_is_not_a_real_medical_illness',
        Post_20__c:'form.post_challenge_mindskillz-_zambia_100.people_with_mental_illness_are_dangerous',
        Post_21__c:'form.post_challenge_mindskillz-_zambia_100.it_is_best_to_avoid_people_with_mental_illness_so_that_you_dont_develop_thi',
        Post_22__c:'form.post_challenge_mindskillz-_zambia_100.if_i_had_a_mental_illness_i_would_not_tell_anyone',
        Post_23__c:'form.post_challenge_mindskillz-_zambia_100.seeing_a_mental_health_professional_means_you_are_not_strong_enough_to_mana',
        Post_24__c:'form.post_challenge_mindskillz-_zambia_100.if_i_had_mental_illness_i_would_not_seek_help_from_a_mental_health_professi',
        Post_25__c:'form.post_challenge_mindskillz-_zambia_100.i_believe_treatment_for_a_mental_illness_provided_by_a_mental_health_profes',
              },
      'post_challenge_skillz_girl_nih200': {
        Post_1__c:'form.post_challenge_skillz_girl_nih200.i_have_talked_about_hiv_with_an_adult_in_the_past_two_months_outside_skillz',
        Post_2__c:'form.post_challenge_skillz_girl_nih200.i_have_talked_about_hiv_with_a_friend_in_the_past_two_months_outside_skillz',
        Post_3__c:'form.post_challenge_skillz_girl_nih200.having_sex_with_an_older_partner_increases_my_risk_of_getting_hiv',
        Post_4__c:'form.post_challenge_skillz_girl_nih200.i_know_where_to_get_contraception_to_prevent_unwanted_pregnancy',
        Post_5__c:'form.post_challenge_skillz_girl_nih200.i_know_someone_in_my_community_who_distributes_contraceptives_and_other_sex',
        Post_6__c:'form.post_challenge_skillz_girl_nih200.having_more_than_one_sexual_partner_increases_my_risk_of_getting_hiv',
        Post_7__c:'form.post_challenge_skillz_girl_nih200.i_have_the_right_to_say_no_to_sex_no_matter_who_asks',
        Post_8__c:'form.post_challenge_skillz_girl_nih200.as_a_girl_i_have_a_greater_risk_of_getting_hiv_than_boys',
        Post_9__c:'form.post_challenge_skillz_girl_nih200.i_know_where_to_get_support_services_for_rape',
        Post_10__c:'form.post_challenge_skillz_girl_nih200.if_a_girl_is_sexually_abused_she_can_reduce_her_risk_of_getting_hiv_by_taki',
        Post_11__c:'form.post_challenge_skillz_girl_nih200.i_feel_good_about_being_a_girl',
        Post_12__c:'form.post_challenge_skillz_girl_nih200.it_is_the_mans_responsibility_to_make_decisions_in_a_relationship',
        Post_13__c:'form.post_challenge_skillz_girl_nih200.boys_should_share_the_work_around_the_home_such_as_household_chores',
        Post_14__c:'form.post_challenge_skillz_girl_nih200.i_know_what_i_want_to_be_after_finishing_secondary_school',
        Post_15__c:'form.post_challenge_skillz_girl_nih200.if_i_have_a_problem_i_have_someone_in_my_life_i_can_talk_to_for_advise',
        Post_16__c:'form.post_challenge_skillz_girl_nih200.a_boyfriend_may_have_good_reason_to_hit_his_girlfriend',
        Post_17__c:'form.post_challenge_skillz_girl_nih200.i_would_tell_someone_if_i_were_touched_in_a_manner_that_made_me_uncomfortab',
        Post_18__c:'form.post_challenge_skillz_girl_nih200.i_can_reach_my_goals_in_life',
        Post_19__c:'form.post_challenge_skillz_girl_nih200.a_girl_should_wait_to_get_married_until_after_college',
        Post_20__c:'form.post_challenge_skillz_girl_nih200.biological_and_social_factors_contribute_to_females_and_males_experiencing_',
        Post_21__c:'form.post_challenge_skillz_girl_nih200.the_most_common_illness_of_mental_health_are_depression_and_anxiety',
        Post_22__c:'form.post_challenge_skillz_girl_nih200.mental_health_problems_have_nothing_to_do_with_being_lazy_or_weak_and_many_',
        Post_23__c:'form.post_challenge_skillz_girl_nih200.i_am_ready_to_take_an_hiv_test',
        Post_24__c:'form.post_challenge_skillz_girl_nih200.are_you_or_your_boyfriendgirlfriend_currently_using_any_contraceptive_or_pr',
      },
      'post_challenge_mindskillz_pamumvuri':{
        Post_1__c: 'form.post_challenge_mindskillz_pamumvuri.when_i_express_my_feelings_clearly_people_understand_me_better',
        Post_2__c: 'form.post_challenge_mindskillz_pamumvuri.i_have_skills_that_help_me_bounce_back_from_difficult_situations',
        Post_3__c: 'form.post_challenge_mindskillz_pamumvuri.stress_is_a_normal_part_of_life',
        Post_4__c: 'form.post_challenge_mindskillz_pamumvuri.i_can_reach_my_goals_in_life',
        Post_5__c: 'form.post_challenge_mindskillz_pamumvuri.if_i_have_a_problem_i_have_someone_in_my_life_i_can_go_to_for_support',
        Post_6__c: 'form.post_challenge_mindskillz_pamumvuri.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
        Post_7__c: 'form.post_challenge_mindskillz_pamumvuri.self_control_helps_you_make_smart_decisions_when_you_are_angry_or_upset',
        Post_8__c: 'form.post_challenge_mindskillz_pamumvuri.society_expects_boys_and_girls_to_deal_with_their_emotions_differently',
        Post_9__c: 'form.post_challenge_mindskillz_pamumvuri.i_know_how_to_express_my_anger_without_being_violent',
        Post_10__c: 'form.post_challenge_mindskillz_pamumvuri.listening_carefully_to_others_is_an_important_communication_skill',
        Post_11__c: 'form.post_challenge_mindskillz_pamumvuri.drinking_too_much_alcohol_can_have_serious_negative_consequences_for_mental',
        Post_12__c: 'form.post_challenge_mindskillz_pamumvuri.i_can_understand_how_others_are_feeling_and_be_sensitive_to_their_emotions',
        Post_13__c: 'form.post_challenge_mindskillz_pamumvuri.i_am_confident_that_i_know_where_to_seek_information_about_mental_illness',
        Post_14__c: 'form.post_challenge_mindskillz_pamumvuri.i_am_confident_using_the_computer_or_telephone_to_seek_information_about_me',
        Post_15__c: 'form.post_challenge_mindskillz_pamumvuri.i_am_confident_attending_face_to_face_appointments_to_seek_information_abou',
        Post_16__c: 'form.post_challenge_mindskillz_pamumvuri.i_am_confident_i_have_access_to_resources_eg_doctor_internet_friends_that_i',
        Post_17__c: 'form.post_challenge_mindskillz_pamumvuri.people_with_mental_illness_could_snap_out_of_it_if_they_wanted',
        Post_18__c: 'form.post_challenge_mindskillz_pamumvuri.a_mental_illness_is_a_sign_of_personal_weakness',
        Post_19__c: 'form.post_challenge_mindskillz_pamumvuri.a_mental_illness_is_not_a_real_medical_illness',
        Post_20__c: 'form.post_challenge_mindskillz_pamumvuri.people_with_mental_illness_are_dangerous',
        Post_21__c: 'form.post_challenge_mindskillz_pamumvuri.it_is_best_to_avoid_people_with_mental_illness_so_that_you_dont_develop_thi',
        Post_22__c: 'form.post_challenge_mindskillz_pamumvuri.if_i_had_a_mental_illness_i_would_not_tell_anyone',
        Post_23__c: 'form.post_challenge_mindskillz_pamumvuri.seeing_a_mental_health_professional_means_you_are_not_strong_enough_to_mana',
        Post_24__c: 'form.post_challenge_mindskillz_pamumvuri.if_i_had_mental_illness_i_would_not_seek_help_from_a_mental_health_professi',
      },
    
    'post_challenge_south_africa_-_skillz_girl_mh_sa_211':{
      Post_1__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_know_my_rights_and_responsibilities',
      Post_2__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
      Post_3__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_know_where_to_get_contraception_to_prevent_unwanted_pregnancy',
      Post_4__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.stress_is_a_normal_part_of_life',
      Post_5__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.like_physical_health_we_all_have_mental_health',
      Post_6__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.it_is_the_males_responsibility_to_make_decisions_in_a_relationship',
      Post_7__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.healthy_relationships_are_based_on_healthy_communication_and_mutual_respect',
      Post_8__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_Post.sometimes_a_man_may_have_a_good_reason_to_hit_his_girlfriend_partner_or_wif',
      Post_9__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_can_say_no_to_sex_even_if_my_partner_or_friends_pressure_me_to_have_sex',
      Post_10__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.having_more_than_one_sexual_partner_increases_my_risk_of_getting_hiv',
      Post_11__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.taking_prep_and_using_a_condom_can_lower_my_risk_of_getting_hiv',
      Post_12__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh',
      Post_13__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.deep_breathing_is_a_healthy_way_to_deal_with_difficult_and_stressful_situat',
      Post_14__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.post_exposure_prophylaxis_pep_can_reduce_my_risk_of_getting_hiv_if_taken_1-',
      Post_15__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.it_is_my_right_to_access_health_services',
      Post_16__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_have_an_adult_or_someone_in_my_life_i_can_go_to_for_advice',
      Post_17__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_can_give_support_and_encouragement_to_a_friend_or_family_member_who_is_li',
      Post_18__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.using_a_condom_and_another_contraceptive_method_can_help_prevent_unwanted_p',
      Post_19__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.i_know_what_changes_to_expect_in_my_body_during_puberty',
      Post_20__c: 'form.post_challenge_south_africa_-_skillz_girl_mh_sa_211.drinking_too_much_alcohol_can_harm_the_body_and_the_mind',
    },
    
     'post_challenge_skillz_girl_abbreviated_south_africa':{
      Post_1__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_know_my_rights_and_responsibilities',
      Post_2__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_can_identify_my_strengths_or_things_that_i_am_good_at_in_life',
      Post_3__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_know_where_to_get_contraception_to_prevent_unwanted_pregnancy',
      Post_4__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.stress_is_a_normal_part_of_life',
      Post_5__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.like_physical_health_we_all_have_mental_health',
      Post_6__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.it_is_the_males_responsibility_to_make_decisions_in_a_relationship',
      Post_7__c: 'form.post_challenge_skillz_girl_abbreviated_south_africpostn_a_relationship_it_is_both_partners_responsibility_to_prevent_unwanted_pr',
      Post_8__c: 'form.post_challenge_skillz_girl_abbreviated_south_afPosta.healthy_relationships_are_based_on_healthy_communication_and_respect',
      Post_9__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.sometimes_a_man_may_have_a_good_reason_to_hit_his_girlfriend_partner_or_wif',
      Post_10__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.a_person_has_the_right_to_have_sex_with_their_partner_even_if_the_partner_d',
      Post_11__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_can_say_no_to_sex_even_if_my_partner_or_friends_pressure_me_to_have_sex',
      Post_12__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.having_more_than_one_sexual_partner_increases_my_risk_of_getting_hiv',
      Post_13__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.taking_prep_and_using_a_condom_can_lower_my_risk_of_getting_hiv',
      Post_14__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_know_where_to_go_for_support_if_i_or_someone_i_know_drinks_too_much_alcoh',
      Post_15__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.deep_breathing_is_a_healthy_way_to_deal_with_difficult_and_stressful_situat',
      Post_16__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_can_use_coping_skills_to_handle_stress',
      Post_17__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.post_exposure_prophylaxis_pep_can_reduce_my_risk_of_getting_hiv_if_taken_1-',
      Post_18__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.it_is_my_right_to_access_health_services',
      Post_19__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_have_an_adult_or_someone_in_my_life_i_can_go_to_for_advice',
      Post_20__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.using_a_condom_and_another_contraceptive_method_can_help_prevent_unwanted_p',
      Post_21__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_know_what_changes_to_expect_in_my_body_during_puberty',
      Post_22__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.drinking_too_much_alcohol_can_harm_the_body_and_the_mind',
      Post_23__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_know_at_least_two_ways_of_saving_money',
      Post_24__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.a_budget_is_the_estimated_income_and_expenses_for_a_certain_time_period',
      Post_25__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.accepting_money_for_sexual_favors_can_create_risks_to_my_health_and_safety',
      Post_26__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.using_assertive_communication_means_respectfully_sharing_my_thoughts_and_fe',
      Post_27__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_have_the_right_to_access_emergency_contraception',
      Post_28__c: 'form.post_challenge_skillz_girl_abbreviated_south_africa.i_have_the_right_to_access_emergency_contraception',
    }
      
    };
  
    const pluckSfValue = val => {
    //  if sfFieldMapping[formVersion][val] == undefined 
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
        field('Pre_Post_Completed__c', state => {
          var done = dataValue('form.hidden_properties.post_questionnaire_complete')(state);
          return done === 'Yes' ? true : done === 'No' ? false : undefined;
        }),
        field('Date_Post_Administered__c', dataValue('form.hidden_properties.date')),
        field('Post_1__c', state => {
          const value = dataValue(state.pluckSfValue('Post_1__c'))(state);
          return state.helperFunctions.transform(value);
        }),
      field('Post_2__c', state => {
          if (state.pluckSfValue('Post_2__c') == null) return undefined ;
          const value = dataValue(state.pluckSfValue('Post_2__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        
        field('Post_3__c', state => {
          const value = dataValue(state.pluckSfValue('Post_3__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        
        field('Post_4__c', state => {
          const value = dataValue(state.pluckSfValue('Post_4__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        
        field('Post_5__c', state => {
          const value = dataValue(state.pluckSfValue('Post_5__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_6__c', state => {
          const value = dataValue(state.pluckSfValue('Post_6__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_7__c', state => {
          const value = dataValue(state.pluckSfValue('Post_7__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_8__c', state => {
          const value = dataValue(state.pluckSfValue('Post_8__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_9__c', state => {
          const value = dataValue(state.pluckSfValue('Post_9__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_10__c', state => {
          if (state.pluckSfValue('Post_10__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_10__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_11__c', state => {
          if (state.pluckSfValue('Post_11__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_10__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_12__c', state => {
          if (state.pluckSfValue('Post_12__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_12__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_13__c', state => {
          if (state.pluckSfValue('Post_13__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_13__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_14__c', state => {
          if (state.pluckSfValue('Post_14__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_14__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_15__c', state => {
          if (state.pluckSfValue('Post_15__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_15__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_16__c', state => {
          if (state.pluckSfValue('Post_16__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_16__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_17__c', state => {
          if (state.pluckSfValue('Post_17__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_17__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_18__c', state => {
          if (state.pluckSfValue('Post_18__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_18__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_19__c', state => {
          if (state.pluckSfValue('Post_19__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_19__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
        field('Post_20__c', state => {
          if (state.pluckSfValue('Post_20__c') == null) return undefined
          const value = dataValue(state.pluckSfValue('Post_20__c'))(state); 
          return state.helperFunctions.transform(value);
        }),
      field('Post_21__c', state => {
        if (state.pluckSfValue('Post_21__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_21__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_22__c', state => {
        if (state.pluckSfValue('Post_22__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_22__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_23__c', state => {
        if (state.pluckSfValue('Post_23__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_23__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_24__c', state => {
        if (state.pluckSfValue('Post_24__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_24__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_25__c', state => {
        if (state.pluckSfVaPost('Post_25__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_25__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_26__c', state => {
        if (state.pluckSfValue('Post_26__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_26__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_27__c', state => {
        if (state.pluckSfValue('Post_27__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_27__c'))(state); 
        return state.helperFunctions.transform(value);
      }),
      field('Post_28__c', state => {
        if (state.pluckSfValue('Post_28__c') == null) return undefined
        const value = dataValue(state.pluckSfValue('Post_28__c'))(state); 
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