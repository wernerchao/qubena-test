This project is created for COMPASS Inc. test.

Here is a [demo](https://qubena-test.firebaseapp.com/).

**Note: For this demo to work, you need to use chrome to view the demo.
Also, you need to disable the shield icon in the url because my demo's domain
is using `https`, while it is requesting `http` content. This mixed content
is not favorable, but is OK for this small project.**

Below you will find some information on how to install and use.

Also, the scope and reasoning behind the choices made to complete this task.

## Table of Contents

- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Dependencies](#dependencies)
- [Scope of Project](#scope-of-project)
  - [Chart Choices](#chart-choices)
  - [Responsive Design](#responsive-design)
  - [Known Bugs](#known-bugs)
  - [Improvement](#improvement)

## Installation

To start inspecting the project, type in the following command:

```
$ git clone https://github.com/wernerchao/qubena-test.git
```
Then, 
```
$ npm start
```

* Everything needs to be inspected is stored in the `src` folder
* Please start the insepction with `App.js` file



## Folder Structure

The overall folder structure looks something like 
this (with some unnecessary details omitted):

```
hello-world/
  README.md
  database.rules.json
  firebase.json
  package.json
  build/
  node_modules/
  public/
    index.html
    favicon.ico
  src/
    App.css
    App.js
    App.test.js
    index.css
    index.js
    logo.svg
```

## Dependencies

This project depends on these libraries:

1. react
2. chart.js
3. react-chartjs2
4. react-bootstrap

## Scope of Project

I've defined the project's scope as the follows:

**Given the API, visualize the data using any 
method of choice. May assume the users are 
coming from desktop/laptop. Should also design for mobile, but
the mobile users may not get the full experience, and just the general 
data trend.**

### Chart Choices

I used `bar chart`, `line chart`, and `scatterd chart` for visualization:

1. `bar chart`: for comparing correct and wrong questions. I've tried a 
few others and found putting the bars side by side is the best for visualization.

2. `line chart`: this choice was made because we can see very clearly the corrected
questions out of the total questions. Although the curves don't serve much, but
the area under the curve shows immediately how many correct questions are in total.

3. `scattered chart`: this is just to show the % (out of 100%), so just a point 
is enough. Although a bar chart would also serve nicely, I used scattered chart just to demonstrate 
that the abilities of this library.

### Responsive Design

I've built the one pager to be responsive, 
however, given the data points could be 
hundreds sometimes, it is not a smart choice to 
visualize data on mobile devices. The users should 
access this website using desktop/laptop to get 
the full experience. Mobile site is for visualizing 
the general trend only.

### Known Bugs

The project is not compatible with devices that has screen size smaller than 360px wide (i.e. iphone 5)

### Improvement

**Note: The project's scope is defined small on purpose. So many aspects could be improved**

The project could be improved in several ways:
* Break the parts down into more components, and leave `App.js` cleaner. I didn't do this because a lot of the parts used in `App.js`
are already components, and for this small project, we are not expecting to scale and re-use a lot of stuff. That's why I kept it 
simple, and didn't separate into smaller components.

* Break the hundred of data points down to smaller pieces, and use multiple 
charts when the data is more than a certain number.

  e.g. use 10 data points per chart, so if the data points is 23, 
then serve 3 charts of, 10 + 10 + 3, for each chart, rather than serving 1 chart of 23 data points.

* Allow mobile users to click on the chart and visualize a fully expanded 
and fully functional chart on a new page.

* Re-adjust the chart height for mobile devices. Make the site compatible with devices smaller than 360px wide (i.e. iphone 5).
