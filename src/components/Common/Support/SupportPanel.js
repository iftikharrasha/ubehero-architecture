import React, { useState } from 'react';
import { Card, Typography, Collapse, Tabs, Row, Button } from 'antd';
import { CustomerServiceOutlined } from '@ant-design/icons';
import SupportPost from './SupportPost';

const { Paragraph } = Typography;
const { TabPane } = Tabs;

const supportList = [
    {
        menu: {
            route: 'account',
            title: 'Account Management',
            text: 'Need assistance with your account settings, profile updates, or password reset?',
            subText: 'Our support team is here to help you manage your account effectively.',
            faqs: [
                {
                  key: '1',
                  label: 'How do I update my account information?',
                  children: <p>To update your account information, including your email address, password, or profile details, simply log in to your account and navigate to the "Account Settings" or "Profile" section. From there, you can make the necessary changes and save your updates.</p>,
                },
                {
                  key: '2',
                  label: 'I forgot my password. How can I reset it?',
                  children: <p>If you've forgotten your password, you can easily reset it by clicking on the "Forgot Password" link on the login page. Follow the instructions provided, and a password reset link will be sent to your registered email address. Click on the link to create a new password and regain access to your account.</p>,
                },
                {
                  key: '3',
                  label: `I'm having trouble accessing my account. What should I do?`,
                  children: <p>If you're experiencing difficulties accessing your account, such as being locked out or encountering login errors, please ensure that you're entering the correct login credentials. If the issue persists, contact our support team for further assistance. We'll investigate the issue and help you regain access to your account as quickly as possible.</p>,
                },
                {
                  key: '4',
                  label: `Can I change my username?`,
                  children: <p>Unfortunately, usernames cannot be changed once they have been created. However, you can update other account details such as your email address, password, and profile information as needed.</p>,
                },
                {
                  key: '5',
                  label: `How can I unsubscribe from email notifications?`,
                  children: <p>To manage your email notification preferences, log in to your account and navigate to the "Notifications" or "Email Preferences" section. From there, you can select the types of notifications you wish to receive or opt-out of email communications altogether.</p>,
                },
                {
                  key: '6',
                  label: `How can I unsubscribe from email notifications?`,
                  children: <p>To manage your email notification preferences, log in to your account and navigate to the "Notifications" or "Email Preferences" section. From there, you can select the types of notifications you wish to receive or opt-out of email communications altogether.</p>,
                },
            ]
        },
    },
    {
        menu: {
            route: 'tournament',
            title: 'Tournament Participation',
            text: 'Having trouble with tournament registration, entry fees, or accessing event information?',
            subText: 'Our support specialists are available to ensure a smooth tournament experience for you.',
            faqs: [
                {
                  key: '1',
                  label: 'How can I register for a tournament?',
                  children: <p>To register for a tournament, navigate to the tournament registration page on our website. Select the desired tournament from the list of available events and follow the registration instructions provided. Be sure to provide accurate information and complete any required fields to secure your spot in the tournament.</p>,
                },
                {
                  key: '2',
                  label: 'What are the registration requirements for tournaments?',
                  children: <p>Registration requirements may vary depending on the tournament. Common requirements may include providing personal information, selecting a team or category, agreeing to tournament rules and regulations, and paying any applicable registration fees. Refer to the specific tournament details for registration requirements.</p>,
                },
                {
                  key: '3',
                  label: `Can I participate in multiple tournaments simultaneously?`,
                  children: <p>Yes, in most cases, you can participate in multiple tournaments simultaneously, as long as the schedules do not conflict. Be sure to review the tournament dates and times carefully and plan your participation accordingly to avoid scheduling conflicts.</p>,
                },
                {
                  key: '4',
                  label: `How do I know if my registration for a tournament is confirmed?`,
                  children: <p>Upon successful registration for a tournament, you will typically receive a confirmation email or notification confirming your participation. This email will include important details such as tournament date, time, location (if applicable), and any additional instructions or requirements.</p>,
                },
                {
                  key: '5',
                  label: `What should I do if I encounter issues during the registration process?`,
                  children: <p>If you encounter any difficulties or errors during the registration process, please contact our support team for assistance. We're here to help you troubleshoot any issues you may encounter and ensure a smooth registration experience.</p>,
                },
                {
                  key: '6',
                  label: `Is there a deadline for tournament registration?`,
                  children: <p>Yes, each tournament may have its own registration deadline. It's important to register before the deadline to secure your spot in the tournament. Late registrations may not be accepted, so be sure to check the registration deadline for the tournament you wish to participate in.</p>,
                },
                {
                  key: '7',
                  label: `Can I modify or cancel my tournament registration after submitting it?`,
                  children: <p>In most cases, you may be able to modify or cancel your tournament registration within a specified timeframe before the tournament begins. However, modification and cancellation policies may vary depending on the tournament organizer. Contact our support team for assistance with modifying or canceling your registration.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'organize',
            title: 'Organizing a Tournament:',
            text: 'Planning an event and need guidance on tournament setup, scheduling, or managing participants?',
            subText: 'Let our experienced team assist you in organizing a successful tournament.',
            faqs: [
                {
                  key: '1',
                  label: 'How can I organize a tournament on your platform?',
                  children: <p>To organize a tournament, you can create an account on our platform and access the tournament management tools. From there, you can set up a new tournament, configure the tournament details such as date, time, format, rules, and registration requirements, and publish the tournament for participants to register.</p>,
                },
                {
                  key: '2',
                  label: 'What are the key steps involved in organizing a tournament?',
                  children: <p>Organizing a tournament involves several key steps, including planning the tournament format, setting tournament dates and times, defining rules and regulations, promoting the tournament to attract participants, managing registrations, scheduling matches, and overseeing the tournament proceedings. Our platform provides tools and resources to assist you at every step of the process.</p>,
                },
                {
                  key: '3',
                  label: `Can I customize the rules and regulations for my tournament?`,
                  children: <p>Yes, you have the flexibility to customize the rules and regulations for your tournament based on your specific requirements. You can define rules related to gameplay, scoring, match format, eligibility criteria, and any other regulations you deem necessary for your tournament.</p>,
                },
                {
                  key: '4',
                  label: `How do I promote my tournament and attract participants?`,
                  children: <p>Promoting your tournament is essential to attract participants and ensure its success. You can leverage various marketing channels such as social media, email newsletters, online forums, and community groups to promote your tournament. Additionally, our platform offers promotional tools and features to help you reach a wider audience and maximize participation.</p>,
                },
                {
                  key: '5',
                  label: `Is there a fee for organizing a tournament on your platform?`,
                  children: <p>Our platform offers both free and paid options for organizing tournaments. Depending on your requirements and preferences, you can choose the pricing plan that best suits your needs. Our support team can provide more information about the available pricing options and help you select the right plan for your tournament.</p>,
                },
                {
                  key: '6',
                  label: `What support and assistance do you provide to tournament organizers?`,
                  children: <p>Our support team is dedicated to assisting tournament organizers throughout the entire tournament planning and execution process. Whether you have questions about setting up your tournament, managing registrations, resolving technical issues, or any other aspect of tournament organization, our team is here to provide guidance, support, and assistance every step of the way.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'party',
            title: 'Party Problems',
            text: 'Facing issues with party invites, joining parties, or experiencing technical difficulties during gameplay?',
            subText: 'Reach out to our support team for prompt resolution of your party-related concerns.',
            faqs: [
                {
                  key: '1',
                  label: 'How do I create a party on your platform?',
                  children: <p>To create a party, log in to your account and navigate to the party creation page. From there, you can specify the party details such as party name, privacy settings, and invite friends to join your party. Once created, you can start playing games with your party members.</p>,
                },
                {
                  key: '2',
                  label: `I'm experiencing issues while joining a party. What should I do?`,
                  children: <p>If you're encountering difficulties joining a party, ensure that you're using a compatible device and have a stable internet connection. If the problem persists, try restarting your device or clearing your browser cache. If the issue continues, contact our support team for further assistance.</p>,
                },
                {
                  key: '3',
                  label: `Can I invite friends from different platforms to my party?`,
                  children: <p>Yes, our platform supports cross-platform party invitations, allowing you to invite friends from different gaming platforms to join your party. Simply send them an invitation link or invite them directly from your friends list.</p>,
                },
                {
                  key: '4',
                  label: `What should I do if my party members are experiencing connectivity issues?`,
                  children: <p>If party members are experiencing connectivity issues, advise them to check their internet connection and ensure that they have a stable connection. Additionally, they can try restarting their devices or switching to a different network if possible. If the problem persists, contact our support team for assistance.</p>,
                },
                {
                  key: '5',
                  label: `Is there a limit to the number of players I can invite to my party?`,
                  children: <p>The party size limit may vary depending on the game and platform. Check the party creation page or game settings for information on the maximum number of players allowed in a party. If you encounter any issues with party size limits, contact our support team for assistance.</p>,
                },
                {
                  key: '6',
                  label: `I'm unable to hear my party members' voice chat. How can I fix this?`,
                  children: <p>If you're experiencing issues with voice chat in your party, ensure that your microphone and audio settings are configured correctly. Check your device settings and game settings to make sure that voice chat is enabled and the correct audio input/output devices are selected. If the problem persists, contact our support team for troubleshooting assistance.</p>,
                },
                {
                  key: '7',
                  label: `Can I create a private party for specific friends only?`,
                  children: <p>Yes, you can create a private party and invite specific friends to join. When creating the party, set the privacy settings to "Private" and select the friends you want to invite from your friends list. Only invited friends will be able to join the private party.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'payment',
            title: 'Payment Issues',
            text: 'Encountering problems with payment processing, transaction errors, or refund requests?',
            subText: 'Our dedicated support staff is ready to assist you with any payment-related issues you may have.',
            faqs: [
                {
                  key: '1',
                  label: `I'm experiencing issues with making a payment on your platform. What should I do?`,
                  children: <p>If you're encountering difficulties while making a payment, ensure that you're using a supported payment method and that your payment information is entered correctly. If the problem persists, try using a different payment method or contacting your bank to confirm if there are any issues with your account.</p>,
                },
                {
                  key: '2',
                  label: `My payment was declined. Why did this happen and what should I do next?`,
                  children: <p>Payment declines can occur for various reasons, including insufficient funds, incorrect payment details, or security restrictions imposed by your bank. Check that your payment information is accurate and that you have sufficient funds available in your account. If the issue continues, contact your bank or payment provider for further assistance.</p>,
                },
                {
                  key: '3',
                  label: `How can I request a refund for a payment I've made?`,
                  children: <p>If you need to request a refund for a payment you've made, please contact our support team with details of the transaction, including the payment amount, date, and reason for the refund request. Our support team will review your request and assist you in processing the refund, if applicable, according to our refund policy.</p>,
                },
                {
                  key: '4',
                  label: `I've been charged multiple times for the same transaction. What should I do?`,
                  children: <p>If you've been charged multiple times for the same transaction, please contact our support team immediately with details of the duplicate charges. Provide us with information such as the transaction amount, date, and any relevant payment confirmation numbers. Our support team will investigate the issue and work to resolve it promptly.</p>,
                },
                {
                  key: '5',
                  label: `Are there any additional fees or charges associated with payments on your platform?`,
                  children: <p>Our platform may charge processing fees or other charges associated with certain payment methods or transactions. Be sure to review the terms and conditions and any applicable fees before making a payment. If you have questions about specific fees or charges, contact our support team for clarification.</p>,
                },
                {
                  key: '6',
                  label: `I've received a payment notification, but I didn't authorize the transaction. What should I do?`,
                  children: <p>If you receive a payment notification for a transaction that you didn't authorize, it may indicate fraudulent activity or unauthorized use of your payment information. Contact our support team immediately to report the issue and initiate an investigation. We take security and fraud prevention seriously and will work to resolve the issue promptly.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'guideline',
            title: 'Regulations & Guidelines',
            text: 'Questions about tournament rules, community guidelines, or code of conduct?',
            subText: 'Our support representatives are available to provide clarity on regulations and ensure fair play for all participants.',
            faqs: [
                {
                  key: '1',
                  label: `What regulations and guidelines do I need to adhere to when participating in tournaments?`,
                  children: <p>When participating in tournaments, it's important to familiarize yourself with the rules, regulations, and guidelines set forth by the tournament organizer. These may include rules related to gameplay, eligibility criteria, code of conduct, fair play policies, and any other regulations specific to the tournament.</p>,
                },
                {
                  key: '2',
                  label: `Where can I find the regulations and guidelines for tournaments?`,
                  children: <p>The regulations and guidelines for tournaments are typically provided by the tournament organizer and can usually be found on the tournament registration page, official website, or in the tournament rules document. Be sure to review these regulations carefully before participating to ensure compliance.</p>,
                },
                {
                  key: '3',
                  label: `What happens if I violate tournament regulations or guidelines?`,
                  children: <p>Violating tournament regulations or guidelines may result in penalties, disqualification, or other consequences as determined by the tournament organizer. Common violations may include cheating, unsportsmanlike behavior, exploiting bugs or glitches, or failing to adhere to tournament rules. It's important to respect and abide by the regulations to maintain fair play and integrity in the tournament.</p>,
                },
                {
                  key: '4',
                  label: `How are tournament regulations enforced?`,
                  children: <p>Tournament regulations are enforced by the tournament organizer and may involve monitoring gameplay, reviewing reports of misconduct, and investigating alleged violations. Organizers may take disciplinary action against participants found to be in violation of the regulations, such as issuing warnings, imposing penalties, or disqualifying players from the tournament.</p>,
                },
                {
                  key: '5',
                  label: `Can I appeal a decision regarding a violation of tournament regulations?`,
                  children: <p>Yes, most tournament organizers have procedures in place for participants to appeal decisions regarding violations of tournament regulations. If you believe a decision was made in error or unfairly, you can submit an appeal following the instructions provided by the tournament organizer. Appeals will be reviewed and adjudicated by the organizer or a designated appeals committee.</p>,
                },
                {
                  key: '6',
                  label: `Where can I report violations of tournament regulations or misconduct?`,
                  children: <p>If you observe or experience violations of tournament regulations or misconduct by other participants, you can report them to the tournament organizer or tournament administrators. Provide detailed information about the incident, including evidence if available, to facilitate the investigation and resolution of the issue.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'technical',
            title: 'Technical Support',
            text: 'Experiencing technical glitches, game crashes, or connectivity issues?',
            subText: 'Our skilled technical support team is here to troubleshoot and resolve your technical challenges promptly.',
            faqs: [
                {
                  key: '1',
                  label: `I'm experiencing technical issues while using your platform. How can I get help?`,
                  children: <p>If you're encountering technical issues, our technical support team is here to assist you. Contact our support team via email, live chat, or phone, and provide details about the issue you're experiencing. Our team will work to diagnose and resolve the issue as quickly as possible.</p>,
                },
                {
                  key: '2',
                  label: `What types of technical issues can your support team assist with?`,
                  children: <p>Our technical support team can assist with a wide range of technical issues, including but not limited to connectivity problems, game crashes, error messages, performance issues, account login issues, and troubleshooting gameplay-related issues.</p>,
                },
                {
                  key: '3',
                  label: `Do I need any technical expertise to contact technical support?`,
                  children: <p>No, you don't need to have technical expertise to contact our technical support team. Simply provide as much detail as possible about the issue you're experiencing, and our support team will guide you through the troubleshooting process and provide assistance every step of the way.</p>,
                },
                {
                  key: '4',
                  label: `What information should I provide when contacting technical support?`,
                  children: <p>When contacting technical support, provide as much information as possible about the issue, including a detailed description of the problem, any error messages received, steps to reproduce the issue, and any troubleshooting steps you've already taken. This information will help our support team diagnose and resolve the issue more efficiently.</p>,
                },
                {
                  key: '5',
                  label: `How long does it typically take to resolve technical issues?`,
                  children: <p>The time it takes to resolve technical issues may vary depending on the complexity of the issue and other factors. Our support team strives to resolve issues as quickly as possible and will keep you updated on the progress of the resolution.</p>,
                },
                {
                  key: '6',
                  label: `What should I do if the suggested troubleshooting steps don't resolve my issue?`,
                  children: <p>If the suggested troubleshooting steps don't resolve your issue, don't hesitate to reach out to our support team for further assistance. Our team may escalate the issue to higher-level support or technical specialists for additional troubleshooting and resolution.</p>,
                },
                {
                  key: '7',
                  label: `Can I receive technical support outside of regular business hours?`,
                  children: <p>Our technical support team is available during regular business hours to assist you with technical issues. If you require assistance outside of regular business hours, please submit a support request, and our team will respond to you as soon as possible during the next available support hours.</p>,
                },
            ]
        }
    },
    {
        menu: {
            route: 'others',
            title: 'Others',
            text: `Can't find the right category for your issue? Select "Others" and provide details about your concern.`,
            subText: 'Our support staff will ensure your inquiry is directed to the appropriate department for assistance.',
            faqs: [
                {
                  key: '1',
                  label: `What should I do if my issue doesn't fit into any of the other categories listed?`,
                  children: <p>If your issue doesn't fit into any of the predefined categories, you can select the "Others" option and provide details about your specific concern. Our support team will review your inquiry and ensure that it is directed to the appropriate department for assistance.</p>,
                },
                {
                  key: '2',
                  label: `Can I still receive support for my issue if it's not covered by the predefined categories?`,
                  children: <p>Yes, absolutely! Our support team is here to assist you with any questions, concerns, or issues you may have, regardless of whether they fit into predefined categories. Simply select the "Others" option and provide as much detail as possible about your inquiry, and our team will provide the necessary support and assistance.</p>,
                },
                {
                  key: '3',
                  label: `I have a unique situation that I need help with. Can you still assist me?`,
                  children: <p>Yes, our support team is equipped to handle a wide range of inquiries and unique situations. If you have a specific issue or concern that requires assistance, don't hesitate to reach out to us. We'll do our best to understand your situation and provide the appropriate support and guidance to address your needs.</p>,
                },
                {
                  key: '4',
                  label: `How quickly can I expect a response to my inquiry if I select the "Others" option?`,
                  children: <p>Our goal is to respond to all inquiries and support requests as quickly as possible. Response times may vary depending on the volume of inquiries and the complexity of the issues. Rest assured that our support team will prioritize your inquiry and provide a timely response to assist you with your concerns.</p>,
                },
                {
                  key: '5',
                  label: `Is there a limit to the types of inquiries I can submit under the "Others" category?`,
                  children: <p>No, there is no limit to the types of inquiries you can submit under the "Others" category. Whether you have questions about account management, technical issues, payment concerns, or any other topic, feel free to select the "Others" option and provide details about your inquiry. Our support team will ensure that your inquiry is addressed appropriately.</p>,
                },
                {
                  key: '6',
                  label: `What should I do if I'm unsure which category my issue falls under?`,
                  children: <p>If you're unsure which category your issue falls under, don't worry! Simply select the "Others" option and provide details about your concern. Our support team will review your inquiry and determine the appropriate course of action to assist you. We're here to help you with any questions or issues you may have, regardless of category.</p>,
                },
            ]
        }
    },
];

const SupportPanel = ({id, routeKey, handleTabChange }) => {
    const [openTicket, setOpenTicket] = useState(false);

    const onChange = (key) => {
        console.log(key);
    };

    const handleTicket = () => {
        setOpenTicket(true);
    };

    return (
        <Card className="tabCard mb-5">
            <Tabs activeKey={routeKey} onChange={handleTabChange} tabPosition="left">
                {   
                    supportList?.map((item, index) => (
                        <TabPane
                            key={item?.menu?.route}
                            tab={
                                <Row justify="left" align="middle">
                                    <CustomerServiceOutlined  style={{ fontSize: '16px' }} /> <span>{item?.menu?.title}</span>
                                </Row>
                            }
                        >
                            <h4 className='mb-4'>{item?.menu?.text} <br /> {item?.menu?.subText}</h4>
                            <Paragraph style={{fontSize: '20px'}}>Frequesntly Asked Questions</Paragraph>
                            <Collapse items={item?.menu?.faqs} defaultActiveKey={['1']} onChange={onChange} />
                            <Paragraph style={{fontSize: '20px', margin: '20px 0'}}>I still have a question not covered here. How can I get assistance?</Paragraph>
                            <Button type="primary" onClick={handleTicket}>
                                Create a Ticket
                            </Button>
                        </TabPane> 
                    ))
                }
                </Tabs> 
                <SupportPost
                    id={id}
                    open={openTicket}
                    setOpen={setOpenTicket}
                    routeKey={routeKey}
                /> 
        </Card>
    );
};

export default SupportPanel;