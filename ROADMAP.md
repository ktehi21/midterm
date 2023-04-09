# LIGHTHOUSE LABS - Mid-term Project

## Project Learning Outcomes
* experience with collaboration
* learn how to work with others
* reinforce the foundation of skills
* working on a project from start-to-finish

### This File...

Here is where you'll find our thought process, our plans, and step-by-step execution of this app as it happens. Follow along as we test what we've learned!

### User Stories

- As a user, I want to be able to submit text, because I want to add things to my list!
- As a user, I want to save my lists to a login, because I don't want to rewrite everything.
- As a user, I want the items to auto-categorize, because this is a smart list!
- As a user, I want the lists to be about things I need "to Do/Watch/Eat at!", bc this is stuff I haven't done yet!
- As a user, I want to be able to re-categorize the items, bc the API could get it wrong

- As a user, I shouldn't be able to see other users lists/items, because that's not my stuff! I didn't put it there!
- As a user, I shouldn't be able to take over the site with malicious text, because I"m not an evil hacker!
- as a user, I shouldn't be able to delete or create my own Categories/Lists, because the site can't handle items it's not coded for!
- As a user, I shouldn't be able to to access lists without being logged in, because they won't be saved for me!

STRETCH FUNCTIONS - What we hope to achieve!
- As a user, I want to get reminders about my lists, because I don't want to forget I them - they're on a list for a reason!
- As a user, I want to set my own reminder time-limits for lists/items, because I only eat out on weekends but I watch movies every night!

### User Scenarios

- Given an error for multiple returns on an item, when the list is selected, then the item is sorted to that list.
- Given that I'm not logged in, when I click the login button, then I should see my active lists and the "add new item" box.
- Given that I'm logged in, when I click a list title, then the list expands to show the contents.

### Routes

RESTful conventions used!

-Browse  GET   /my-todo
-Read    GET   /my-todo/:id
-Edit    PATCH /my-todo/:id
-Add     POST  /my-todo
-Delete  POST  /my-todo/:id

### Wireframe

##### Wireframe of Smart To-Do App 
![Screenshot of First Draft Wireframe Mockup - The Login ](https://github.com/ktehi21/midterm/blob/master/docs/LOGIN-FirstDraft.png?raw=true)
![Screenshot of First Draft Wireframe Mockup - The Main Page](https://github.com/ktehi21/midterm/blob/master/docs/MAIN-FirstDraft.png?raw=true)
![Screenshot of First Draft Wireframe Mockup - Main Page with To-Do creation](https://github.com/ktehi21/midterm/blob/master/docs/MAIN+TODO-FirstDraft.png?raw=true)

##### Mockups based on Wireframe
![Screenshot of Design Mockup - The Login](https://github.com/ktehi21/midterm/blob/master/docs/concepts1.png?raw=true)
![Screenshot of Design Mockup - The Main Page](https://github.com/ktehi21/midterm/blob/master/docs/concepts2.png?raw=true)

### ERD - Entity Relationship Diagram

![Screenshot of ERD](https://github.com/ktehi21/midterm/blob/master/docs/ERD.png?raw=true)
