Feature('Login');
var baseUrl =

Before((I) => {
  I.ignoreSynchronisation = true;
  Login(I, 'Test123@TEST.COM', '123')
})


 Scenario('As a user I lands on the default page if I dont provide the document url to be viewed', (I) => {
   I.seeInCurrentUrl(baseUrl)
   I.see('HMCTS')
   I.see('Evidence Management Viewer')
   I.see('Sign out')
   I.see('ALPHA This is a new service – your feedback will help us to improve it.')
   I.see('No Document url has been provided to Document Viewer')
   I.see('Please provide a Document url')
   I.see('Go Back')
   I.see('Open Government Licence')
   I.see('All content is available under the Open Government Licence v3.0, except where otherwise stated')
   I.see('© Crown copyright')
   // I.seeInCurrentUrl('/Login?');
   // I.seeInCurrentUrl('GOV.UK');
 })

 Scenario('As a user I can view a valid document uploaded by myself', (I) => {
   var dmPdfDocumentUrl = '';
   I.amOnPage(baseUrl + '?url=' + dmPdfDocumentUrl)
   verifyUploadedPdf(I)
 });

 Scenario('As a user I should get 404 when i try to view a document that does not exists', (I) => {
   var dmMissingDocumentUrl = '';
   I.amOnPage(baseUrl + '?url=' + dmMissingDocumentUrl)
   I.waitForText('Response status was 404.', 15)
   I.see('HMCTS')
   I.see('Evidence Management Viewer')
   I.see('Sign out')
   I.see('ALPHA This is a new service – your feedback will help us to improve it.')
   I.see('There was an error while loading your document.')
   I.see('Response status was 404.')
   I.see('Go Back')
 });

 Scenario('As an authenticated user but not the owner, i cannot view the document', (I) => {
    var dmSomeoneElseDocumentUrl = '';
   I.click('Sign out')
   Login(I, 'Test@Test.com', '123')
   I.amOnPage(baseUrl + '?url=' + dmSomeoneElseDocumentUrl)
   I.waitForText('Response status was 403.', 15)
   I.see('HMCTS')
   I.see('Evidence Management Viewer')
   I.see('Sign out')
   I.see('ALPHA This is a new service – your feedback will help us to improve it.')
   I.see('There was an error while loading your document.')
   I.see('Response status was 403.')
   I.see('Go Back')

 }
 )

Scenario('As a user I can view comments text box to annotate', (I) => {
   var dmPdfDocumentUrl = '';
  I.amOnPage(baseUrl + '?url=' + dmPdfDocumentUrl + '&annotate=true')
  verifyUploadedPdf(I)
  I.see('Summary')
  I.see('Notes:')
  I.see('Page 1')
  I.see('Save')
  I.see('Cancel')
// TODO: I want to verify that the button for save and cancel are disabled
  // I.seeElement('//*[@id="notesForm"]/div/button[contains(.,"disabled")]')
  addComment(I, 'Comment_Test1')
  addComment(I, 'Comment_Test2')
  I.click('//*[@id="content"]/app-dm-viewer-route/app-dm-viewer/a')
  I.waitForText('Page 1', 15)
  I.see('Comment_Test1')
  I.see('Comment_Test2')
  I.click('//*[@id="content"]/app-em-annotation-summary-route/app-em-annotation-summary/h2/a')
  clearComment(I)
  clearComment(I)

})

 var addComment = function comment(I, comments)
 {
//   I.fillField('currentNote', comments)
   I.fillField('//*[@id="currentNote"]', comments)
   I.click('Save')
   I.wait(3)
//   I.seeInField('currentNote', comments)
   I.fillField('//*[@id="currentNote"]', comments)
   I.click('Next')
   I.wait(3)
 }

 var clearComment = function clearcomment(I)
 {
//  I.fillField('currentNote', '')
  I.fillField('//*[@id="currentNote"]', '')
  I.click('Save')
  I.wait(3)
//  I.seeInField('currentNote', '')
  I.fillField('//*[@id="currentNote"]', '')
  I.click('Next')
  I.wait(3)
 }

var verifyUploadedPdf = function verifyPdf(I)
{
  I.waitForText('Understanding Crude Oil Prices*', 20)
  I.see('understand_oil.pdf')
  I.see('Page 1 of 45.')
  I.see('Previous')
  I.see('Next')
  I.see('Understanding Crude Oil Prices*')
}

var Login = function Login(I, username, password)
{
  var idamLoginUrl = '';
  var emViewerUrl = '';
  I.amOnPage(idamLoginUrl + '/login?continue-url=' + emViewerUrl)
  I.appendField('username', username)
  I.appendField('password', password)
  I.click('Sign in')
  I.wait(3)
  I.ignoreSynchronisation = false;
}
