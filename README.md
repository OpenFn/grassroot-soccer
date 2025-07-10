<img width="914" height="252" alt="image" src="https://github.com/user-attachments/assets/4bb179c8-ba01-4aaa-858e-4b903b6f3c20" /><img width="274" alt="Screen_Shot_2021-05-30_at_22 24 28-removebg-preview" src="https://user-images.githubusercontent.com/80456839/120684457-b2310080-c46c-11eb-9579-d090700caceb.png">


# Grassroot Soccer Integrations


## (1) Solution Overview 

GRS is working with Dimagi to design and deploy CommCare workflows across their organization. OpenFn has configured an automated data integration solution between CommCare and Salesforce to sync shared beneficiary information and enable for real-time monitoring of field data collection. 

[See here](https://docs.google.com/spreadsheets/d/1CXrMYL0hELSeRkjJLUROTR0A3udJ0Yq8PQZhUtTQokk/edit#gid=544330146) for the data element mapping specification.



## (2) Integration Flows
The solution is a one-way CommCare-to-Salesforce integration that connects the following CommCare forms. These workflows have been updated in June 2025 in line with GRS's migration to a new Salesforce org(Amp Impact) which uses [this](https://drive.google.com/file/d/1pJeABynp42uQbumfYj0MaBmlBWn00ZDF/view?usp=drive_link) data model. The workflows below have been updated and remapped to work with the new data model:  
| WF Code | Workflow Name                           | WF Steps                                                                                                                                                                                                                                            | Amp Impact Object(s)                                                                 |
|---------|-----------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------|
| WF1     | Create Intervention                     | - Upsert GRS event with type "Intervention" <br> - Event session gets created automatically <br> - Upsert Event Participation using Coach external ID                                                                                              | `GRS Event (Intervention)` <br> `Event_Participation__c`                              |
| WF2     | Upsert Intervention Notes               | - Update intervention with Intervention Notes                                                                                                                                                                                                      | `GRS Event (Intervention)`                                                            |
| WF3     | Upsert Register Participant             | - Upsert Contact record for each participant <br> - Upsert Event Participation for each participant                                                                                                                                                | `Contact` <br> `Event_Participation__c`                                               |
| WF4     | Coach Session Register                  | - Upsert an Event Session for a coach under a GRS Event (Intervention) <br> - Upsert an Attendance for each coach                                                                                                                                | `Event_Session__c` <br> `Attendance__c`                                               |
| WF5     | Upsert Pre Challenges                   | - Query Project by Intervention name <br> - Query Contact by `case_id` <br> - Query Submission Template of type "Pre/Post" <br> - Upsert Submission <br> - Questions auto-created for submission <br> - Query Questions <br> - Update Questions    | `Submission__c` <br> `Ampi__Question__c`                                              |
| WF6     | Upsert Post Challenges                  | - Same steps as WF5                                                                                                                                                                                                                               | `Submission__c` <br> `Ampi__Question__c`                                              |
| WF7     | Upsert Register Skillz Plus Club        | - Upsert Intervention Event with `curriculum = 35` <br> - Event session gets created automatically <br> - Upsert Event Participation                                                                                                              | `GRS Event (Intervention)` <br> `Event_Participation__c`                              |
| WF8     | Upsert Attendance Skillz Plus Club      | - Update the session date for Event Session <br> - Upsert Event Participation <br> - Upsert Attendance                                                                                                                                            | `Event_Session__c` <br> `Event_Participation__c` <br> `Attendance__c`                 |
| WF9     | Attendance Non Skillz                   | - For each participant in input, upsert Attendance                                                                                                                                                                                                | `Attendance__c`                                                                       |
| WF10    | Upsert Home Visit Log Form              | - Upsert Event Participation for participant <br> - Upsert Event Participation for coach <br> - Upsert Visit record                                                                                                                              | `Event_Participation__c` <br> `Visit__c`                                              |
| WF11    | Upsert Coach Support Visit CSV          | - Upsert Event Participation for coach <br> - Upsert Visit record <br> - Query Submission Template of type "Coach Support Visit" <br> - Upsert Submission <br> - Questions auto-created <br> - Query & Update Questions                           | `Event_Participation__c` <br> `Visit__c` <br> `Submission__c` <br> `Ampi__Question__c` |
| WF12    | Upsert Risk & Vulnerability Assessment – Service Referral | - Remap input into array of referral services <br> - Create a Service Referral of type "Individual" for each Service Type                                                                                                   | `Service_Referral__c`                                                                  |
| WF13    | Update Aggregate Service Referrals      | - Remap input into array of referral services <br> - Create a Service Referral of type "Aggregated" for each Service Type                                                                                                                        | `Service_Referral__c`                                                                  |

## Remaining workflows 
The following workflows **have not** been migrated or remapped to work with Amp Impact because they have been identified as out of scope for this iteration as confirmed by GRS in June 2025.
- Upsert Service Referral  
- Outcome Survey  
- Upsert Register Event  
- HIV Testing Event Statistics  
- Upsert Team or Group Name
  
### Flow Triggers
Trigger Type: Message Filter  
A message filter trigger has been configured for each of the forms above. The corresponding job will run when a form with the matching message filter is recieved to the configured webhooks. These can be adjusted in the OpenFn project.

### External Identifiers

| Object Name                    | Amp Impact Field             | Comment                                                                                     |
|-------------------------------|------------------------------|---------------------------------------------------------------------------------------------|
| `ampi__Project__c` (Event)     | `CommCare_External_ID__c`     | This is the case ID of the event                                                            |
| `Event_Participation` (Coach)  | `CommCare_External_ID__c`     | This is the case ID of the event + "_" + the case ID of the coach                          |
| `Event_Participation` (Participant) | `CommCare_External_ID__c` | This is the case ID of the event + "_" + the case ID of the participant                    |
| `Event` (Aggregate Testing)    | `CommCare_External_ID__c`     | This is the case ID of the event + "_" + age range                                         |
| `Attendance__c`                | `CommCare_External_ID__c`     | This is the CommCare External ID of Event Session + "_" + that of the Participant          |
| `Referral_Services__c`         | `CommCare_External_ID__c`     | Case ID of the CommCare referral record + "_" + referral service type                      |
| `Contact`                      | `CommCare_External_ID__c`     |                                                                                             |
| `GRS_Referral__c`              | `CommCare_External_ID__c`     | Service type text, e.g., "hiv_testing"                                                     |
| `Visit__c`                     | `CommCare_External_ID__c`     | Case ID of the CommCare record                                                              |
| `ampi__Submission__c`          | `CommCare_External_ID__c`     | ID of participant + "_" + Event External ID + Submission type (pre/post)                   |
| `Account`                      | `Name`                        | Account name                                                                                |
| `Event_Session__c`             | `CommCare_External_ID__c`     | Event External ID + "_" + session name                                                     |
| `ampi__Geographical_Area__c`   | `CommCare_External_ID__c`     | Case ID of the CommCare record                                                              |
| `Curriculum__c`                | `CommCare_External_ID__c`     | Case ID of the CommCare record                                                              |
| `ampi__Question__c`            | `CommCare_Property_Name__c`   | This is the code used on CommCare to identify the question                                 |



## (3) Assumptions & Considerations for Change Management
1. **[Amp Impact Automation](https://docs.google.com/presentation/d/1VF-JdRQIctpY_b8ErYCbOO_IkveuZNOoYupDYgyWZeg/edit?slide=id.p#slide=id.p):** When an event is created with a curriculum using OpenFn workflows, **event sessions will be automatically created** in Amp Impact based on **session templates**.

2. **[Amp Impact Automation](https://docs.google.com/presentation/d/1VF-JdRQIctpY_b8ErYCbOO_IkveuZNOoYupDYgyWZeg/edit?slide=id.g36e8a6c3d82_0_78#slide=id.g36e8a6c3d82_0_78):** When a **submission is created**, **questions** will be automatically created for that submission based on **template questions configured** for that curriculum.

3. **Event session names** on Amp Impact are assumed to be the **exact same as those created on CommCare**.

4 **External IDs** for **question templates** and **GRS services** are assumed to be **configured to match the keys to the forms** used in CommCare.

5. If **Venues, Curriculums, Sites, Business Units, or Coaches** are added to CommCare, they must also be **uploaded to Salesforce**.

6. Users of the mobile app should always ensure they are using the **latest version of the CommCare app** to maintain compatibility.

## (4) Administration
### Provisioning, Hosting, & Maintenance
This integration is hosted on OpenFn.org with CommCare and Salesforce Hosted SaaS. OpenFn will provide ongoing maintenance support to the GRS administrators managing OpenFn.

### Process for Adding New Curricula

To add a new Curriculum to the integration, please follow this process:

1. Add curriculum to CommCare
2. Add curriculum to Amp Impact
3. Configure pre/post template questions to on Amp Impact with `CommCare _Property_Name` field configured to match the questions keys configured on CommCare
4. Run tests to confirm the curriculum works as expected

### Process for Adding a Question to Pre/Post and Coach Support Visit
To add a new question for Pre/Post or Coach Support visit, please follow this process
1. Configure the question on CommCare and make a note of the Question ID
<img width="914" height="252" alt="image" src="https://github.com/user-attachments/assets/0df56f9f-8a55-486b-9a04-4ee7dda916eb" />

2. When creating the corresponding Question Template on Amp Impact, use the Question ID as `CommCare Property Name`
<img width="1056" height="693" alt="Screenshot 2025-07-10 at 16 12 30" src="https://github.com/user-attachments/assets/b620d10c-8f87-4c31-af75-6dc14a1b5537" />


### Process for adding a new GRS Service on Amp Impact
To add a new GRS Service for `Aggregate Service Referral` or `Risk and Vulnerability Assessment - Service Referral`, please follow the following steps:
1. Configure a case property on CommCare and make a note of the `Choice Value`(for Risk and Vulnerability Assessment - Service Referral) or the `Question ID`(for Aggregate Service Referral) you have set for that case property
<img width="914" height="252" alt="image" src="https://github.com/user-attachments/assets/a180235b-50ed-4975-ac54-5f6701b327c5" />
<img width="914" height="252" alt="image" src="https://github.com/user-attachments/assets/3eb5e449-7d65-4a1c-8998-00d1392649a7" />

2. Then create a GRS Service on Amp Impact, use the Choice Value/Question ID as `CommCare External ID`

## Workflow Diagrams

Detailed workflow diagrams for each of the above workflows can be found in [this doc diagram](https://docs.google.com/presentation/d/1VF-JdRQIctpY_b8ErYCbOO_IkveuZNOoYupDYgyWZeg/edit?slide=id.g36e8a6c3d82_0_87#slide=id.g36e8a6c3d82_0_87).

The workflows were designed based on [this](https://docs.google.com/spreadsheets/d/1CXrMYL0hELSeRkjJLUROTR0A3udJ0Yq8PQZhUtTQokk/edit?gid=544330146#gid=544330146) updated mapping spec as per the transition to Amp Impact in June 2025.

### Support
Primary GRS support contact: dvumbi@grassrootsoccer.org

Contact support@openfn.org with any OpenFn questions or troubleshooting support.

### Important Links
1. [Salesforce new data model](https://drive.google.com/file/d/1pJeABynp42uQbumfYj0MaBmlBWn00ZDF/view?usp=drive_link)
3. [Salesforce System Walkthrough](https://drive.google.com/file/d/1UCq2e3Qw8rjF7mapP_PR-vxb0602k_Dj/view)
4. [Automations that run(or don't run) for the Integration User on Salesforce](https://docs.google.com/spreadsheets/d/1jk_J4RPQMVZhia8GJcgfsvT2-LA5LzE3yIMNMenV9BI/edit?gid=0#gid=0)
5. [Mapping Specification](https://docs.google.com/spreadsheets/d/1CXrMYL0hELSeRkjJLUROTR0A3udJ0Yq8PQZhUtTQokk/edit?gid=544330146#gid=544330146)
6. [Workflow Diagrams](https://docs.google.com/presentation/d/1VF-JdRQIctpY_b8ErYCbOO_IkveuZNOoYupDYgyWZeg/edit?slide=id.g36e8a6c3d82_0_87#slide=id.g36e8a6c3d82_0_87)



### Training Materials
Video & Slide deck: https://drive.google.com/drive/folders/1KtKTFfqc0jcgrmF7jcW7BmiN5-_6Jpk5

