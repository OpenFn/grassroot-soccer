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
`Remove Participant`  
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
These CommCare forms map to these Salesforce objects: `Event`, `Person`, `Attendance`, `CSV`, `HomeVisit`, `PGHQ9StrongMinds`, `NewReferral`, `GRS Referral Aggs`, `ART Adherence Self-Reporting Tool`, and `Risk Assessment`.

### External Identifiers
These are the external identifiers used in every object to uniquely identify records when syncing between CommCare and Salesforce...

## (3) Assumptions & Considerations for Change Management
1. If `Venues` or `Coaches` are added to CommCare...
2. ...
3. Considerations for post-pilot scaling... was anything hard-coded or inflexibly implemented? 

## (4) Administration
### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with CommCare and Salesforce Hosted SaaS. OpenFn will provide ongoing maintenance support to the GRS administrators managing OpenFn, Salesforce, and CommCare.

### Support
Primary GRS support contact: dvumbi@grassrootsoccer.org

Contact support@openfn.org with any OpenFn questions or troubleshooting support.

### Training Materials
[Link to training slides(...)]

