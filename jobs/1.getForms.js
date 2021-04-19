get(
  'https://www.commcarehq.org/a/grassrootsoccertrial/api/v0.5/form/',
  {
    query: {
      //   limit: 5, //max limit: 1000
      /* offset:
        state.meta && state.meta.next
          ? state.meta.limit + state.meta.offset
          : 0, */
      //xmlns: 'http://openrosa.org/formdesigner/40BBC9E3-C650-4F72-A027-235BF33D87AB', //Create Intervention form
      //xmlns: 'http://openrosa.org/formdesigner/D50A9A33-B1B4-41B2-9ACA-15DBBDFBCF8C', //  My Team/Group Name form
      //xmlns: 'http://openrosa.org/formdesigner/D771417E-354E-4906-A686-DF0BA230F16A', // Register Participant form
      //xmlns: 'http://openrosa.org/formdesigner/2B9F69A2-7E51-49F6-9FF9-F72F3EC14A9E', // Register Participant skillz
      //xmlns: 'http://openrosa.org/formdesigner/304CABA9-C8A8-4360-83C6-5E2EC1D2C2AC', // Intervention notes
      //xmlns: 'http://openrosa.org/formdesigner/AA396157-EBF9-4B51-B25A-D5BDA4F3DF73', // Coach Support Visit form Zambia
      //xmlns: 'http://openrosa.org/formdesigner/50A337EB-FBD8-4607-A664-21AAE51DFCD1', // Coach Support Visit form
      //xmlns: 'http://openrosa.org/formdesigner/304CABA9-C8A8-4360-83C6-5E2EC1D2C2AC', // Intervention Notes form
      //xmlns: 'http://openrosa.org/formdesigner/3B4B1C64-092A-4922-B033-94D80A11D960C', // Coach Session Register form
      //xmlns: 'http://openrosa.org/formdesigner/4CFAC371-88F7-4349-BEB2-3DA2BDE445EA', //Malaria Testing Event Snapshot
      // received_on_start: '2021-04-17',
      // received_on_end: '2021-04-19'
    },
  },
  state => {
    const { meta, objects } = state.data;
    const { openfnInboxUrl } = state.configuration;
    const xmlnsList = [
      'http://openrosa.org/formdesigner/40BBC9E3-C650-4F72-A027-235BF33D87AB', //Create Intervention form
      'http://openrosa.org/formdesigner/D50A9A33-B1B4-41B2-9ACA-15DBBDFBCF8C', //  My Team/Group Name form
      'http://openrosa.org/formdesigner/D771417E-354E-4906-A686-DF0BA230F16A', // Register Participant form
      'http://openrosa.org/formdesigner/2B9F69A2-7E51-49F6-9FF9-F72F3EC14A9E', // Register Participant skillz
      'http://openrosa.org/formdesigner/304CABA9-C8A8-4360-83C6-5E2EC1D2C2AC', // Intervention notes
      'http://openrosa.org/formdesigner/AA396157-EBF9-4B51-B25A-D5BDA4F3DF73', // Coach Support Visit form Zambia
      'http://openrosa.org/formdesigner/50A337EB-FBD8-4607-A664-21AAE51DFCD1', // Coach Support Visit form
      'http://openrosa.org/formdesigner/3B4B1C64-092A-4922-B033-94D80A11D960C', // Coach Session Register form
      'http://openrosa.org/formdesigner/4CFAC371-88F7-4349-BEB2-3DA2BDE445EA', //Malaria Testing Event Snapshot
    ];

    const forms = objects.filter(obj => xmlnsList.includes(obj.form['@xmlns']));

    state.configuration = { baseUrl: 'https://www.openfn.org' };

    return each(
      forms,
      post(
        `/inbox/${openfnInboxUrl}`,
        { body: state => state.data },
        state => ({
          ...state,
          data: {},
          references: [],
        })
      )
    )(state);
  }
);
