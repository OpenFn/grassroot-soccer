# Grassroot Soccer Integrations


## (1) Solution Overview 

GRS is working with Dimagi to design and deploy CommCare workflows across their organization. OpenFn has configured an automated data integration solution between CommCare and Salesforce to sync shared beneficiary information and enable for real-time monitoring of field data collection. 

[See here](https://docs.google.com/spreadsheets/d/1CXrMYL0hELSeRkjJLUROTR0A3udJ0Yq8PQZhUtTQokk/edit#gid=544330146) for the data element mapping specification.



## (2) Integration Flows
The solution is a one-way CommCare-to-Salesforce integration that connects the following CommCare forms:  
`Create intervention`  
`My Team/Group Name`  
`Intervention Notes`  
`Register Participant`  
`Attendance`  
`Coach Support Visit Form`  
`Coach Support Visit Form Zambia`  
`Pre Challenges`  
`Post Challenges`  
`Coach Session Register`  
`Home visit log form`   
`PHQ9`  
`Risk & Vulnerability Assessment | Service Referral - Treatment, Care and Support`  
`HIV Testing Event Snapshot`  
`Malaria Testing Event Snapshot`  
`Service Referral Follow Up`  
`Register Event`  
`Service Referral`   
`HIV Testing Event Statistics`  
`Malaria Testing Event Statistics`   
`Aggregate Service Referral`  
`Register Skillz Plus Club`  
`ART Adherence Self-Reporting Tool`  

### Flow Triggers
Trigger Type: Message Filter  
A message filter trigger has been configured for each of the forms above. The corresponding job will run when a form with the matching message filter is recieved in the project inbox. These can be adjusted in the OpenFn project.


### Data Mappings
The CommCare forms map to these Salesforce objects: `Event`, `Person`, `Attendance`, `CSV`, `HomeVisit`, `PGHQ9StrongMinds`, `NewReferral`, `GRS Referral Aggs`, `ART Adherence Self-Reporting Tool`, and `Risk Assessment`.

### External Identifiers
These are the external identifiers used in every object to uniquely identify records when syncing between CommCare and Salesforce.
`Create intervention` - Intervention name   
`My Team/Group Name` - Intervention name   
`Intervention Notes` - Intervention name   
`Register Participant` - Intervention name & case ID  
`Attendance` - Intervention name & case ID  
`Coach Support Visit Form` - Form ID  
`Coach Support Visit Form Zambia` - Form ID  
`Pre Challenges` - Intervention name & case ID  
`Post Challenges` - Intervention name & case ID  
`Coach Session Register`- Case ID  
`Home visit log form` - Form ID  
`PHQ9` - Form ID  
`Risk & Vulnerability Assessment | Service Referral - Treatment, Care and Support` - Form id & case ID   
`HIV Testing Event Snapshot` - Case ID  
`Malaria Testing Event Snapshot` - Case ID  
`Service Referral Follow Up` - Case ID  
`Register Event` - Event name  
`Service Referral` - Case ID  
`HIV Testing Event Statistics` - Case id  
`Malaria Testing Event Statistics` - Case ID  
`Aggregate Service Referral` - Form ID   
`Register Skillz Plus Club` - Event name  
`ART Adherence Self-Reporting Tool` - Form ID  

## (3) Assumptions & Considerations for Change Management
1. If `Venues`, `Curriculums`, `Sites`, `Business Units` or `Coaches` are added to CommCare, they will also need to be uploaded to Salesforce. 
2. Users of the mobile app should always make sure they're using the latest version of the CommCare app.
3. ...
4. Considerations for post-pilot scaling... was anything hard-coded or inflexibly implemented? 

## (4) Administration
### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with CommCare and Salesforce Hosted SaaS. OpenFn will provide ongoing maintenance support to the GRS administrators managing OpenFn, Salesforce, and CommCare.

### Support
Primary GRS support contact: dvumbi@grassrootsoccer.org

Contact support@openfn.org with any OpenFn questions or troubleshooting support.

### Training Materials
[Link to training slides(...)]

