/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('http://localhost:19006') 
  cy.contains('Log into account').click({force: true})
  cy.get('input[placeholder="Email"]').click({force: true}).type('ethan@gmail.com') 
  cy.get('input[placeholder="Password"]').click({force: true}).type('P4ssw0rd!') 
  cy.contains('Login').click({force: true})
})

describe("Check navigate to fitness dashboard", () => {
  it("Should navigate from main dashboard to fitness dashboard", () => {
    cy.get('a[href="/Fitness"]').click()
    cy.contains("h1", "Fitness Dashboard").should("be.visible")
  })
})

describe("Check dashboard widgets", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click() 
    cy.contains("h1", "Fitness Dashboard").should("be.visible")
  })

  it("Can navigate to workout history", () => {
    cy.get('[data-testid="historyWidget"]').click()
    cy.contains("h1", "Workout History").should("be.visible")
  })

  it("Can navigate to workout stats", () => {
    cy.get('[data-testid="statsWidget"]').click()
    cy.contains("h1", "View Stats").should("be.visible")
  })

  it("Can navigate to workout plans", () => {
    cy.get('[data-testid="plansWidget"]').click()
    cy.contains("h1", "Workout Plans").should("be.visible")
  })
})

describe("Check Workout Plans Screen", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click() 
    cy.get('[data-testid="plansWidget"]').click()
    cy.contains("h1", "Workout Plans").should("be.visible")
  })

  it("Checks workout plans and 'create plan' button is visible", () => {
    cy.get('[data-testid="plans_scrollView"]').should("be.visible") 
    cy.get('[data-testid="create_plan_button"]').should("be.visible") 
  })
  
  it("Checks user can access create workout plan screen", () => {
    cy.get('[data-testid="create_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")
  })

  it("Checks user cannot save with no name or exercises", () => {
    cy.get('[data-testid="create_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")

    cy.get('[data-testID="enter_name_button"').click()
    cy.contains("Save Workout").should("be.visible") 
    cy.get('[data-testid="save_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")
    cy.get('[data-testid="snackbar"]').should("be.visible")
  })
  
  it("Checks user cannot save without exercise selected", () => {
    cy.get('[data-testid="create_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")
    
    cy.get('[data-testid="enter_name_button"').click()
    cy.contains("Save Workout").should("be.visible") 
    cy.get('[data-testid="workout_name_input"]').click().type("Custom workout name 2", {force: true})
    cy.get('[data-testid="save_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")
    cy.get('[data-testid="snackbar"]').should("be.visible")
  })

  it("Checks user cannot save without a workout name", () => {
    cy.get('[data-testid="create_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")

    cy.get('[data-testid="searchbar"]').type("Jog", {force: true})
    cy.contains("Jog In Place").should("be.visible")
    cy.contains("Jog In Place").click()

    cy.contains("Exercise Information").should("be.visible")
    cy.get('[data-testid="distance_input"]').should("be.visible")
    cy.get('[data-testid="mins_input"]').should("be.visible")
    cy.get('[data-testid="secs_input"]').should("be.visible")
    cy.get('[data-testid="calories_input"]').should("be.visible")
    cy.get('[data-testid="save_exercise_button"]').should("be.visible")

    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="distance_input"]').click().type("5", {force: true})
    cy.get('[data-testid="mins_input"]').click().type("23", {force: true})
    cy.get('[data-testid="secs_input"]').click().type("14", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.contains("Create New Workout").should("be.visible")
    cy.get('[data-testid="horizontal_scroll"]').should("be.visible")

    cy.get('[data-testID="enter_name_button"').click()
    cy.contains("Save Workout").should("be.visible")
    cy.get('[data-testid="save_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")
    cy.get('[data-testid="snackbar"]').should("be.visible")
  })
  
  it("Checks user can save valid workout plan", () => {
    cy.get('[data-testid="create_plan_button"]').click()
    cy.contains("h1", "Create New Workout").should("be.visible")

    cy.get('[data-testid="searchbar"]').type("bicep", {force: true})
    cy.contains("Machine Bicep Curl").should("be.visible")
    cy.contains("Machine Bicep Curl").click()

    cy.contains("Exercise Information").should("be.visible")
    cy.get('[data-testid="sets_input"]').should("be.visible")
    cy.get('[data-testid="reps_input"]').should("be.visible")
    cy.get('[data-testid="weight_input"]').should("be.visible")
    cy.get('[data-testid="warm_up_set_checkbox"]').should("be.visible")
    cy.get('[data-testid="mins_input"]').should("be.visible")
    cy.get('[data-testid="secs_input"]').should("be.visible")
    cy.get('[data-testid="calories_input"]').should("be.visible")
    cy.get('[data-testid="save_exercise_button"]').should("be.visible")

    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="sets_input"]').click().clear({force: true}).type("2", {force: true})
    cy.get('[data-testid="reps_input"]').click().clear({force: true}).type("3", {force: true})
    cy.get('[data-testid="weight_input"]').click().clear({force: true}).type("-4", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="sets_input"]').click().clear({force: true}).type("2", {force: true})
    cy.get('[data-testid="reps_input"]').click().clear({force: true}).type("-3", {force: true})
    cy.get('[data-testid="weight_input"]').click().clear({force: true}).type("4", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="sets_input"]').click().clear({force: true}).type("-2", {force: true})
    cy.get('[data-testid="reps_input"]').click().clear({force: true}).type("3", {force: true})
    cy.get('[data-testid="weight_input"]').click().clear({force: true}).type("4", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="sets_input"]').click().clear({force: true}).type("2", {force: true})
    cy.get('[data-testid="reps_input"]').click().clear({force: true}).type("3", {force: true})
    cy.get('[data-testid="weight_input"]').click().clear({force: true}).type("4", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()

    cy.get('[data-testid="searchbar"]').clear({force: true}).type("Jog", {force: true})
    cy.contains("Jog In Place").should("be.visible")
    cy.contains("Jog In Place").click()

    cy.contains("Exercise Information").should("be.visible")
    cy.get('[data-testid="distance_input"]').should("be.visible")
    cy.get('[data-testid="mins_input"]').should("be.visible")
    cy.get('[data-testid="secs_input"]').should("be.visible")
    cy.get('[data-testid="calories_input"]').should("be.visible")
    cy.get('[data-testid="save_exercise_button"]').should("be.visible")

    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="distance_input"]').click().clear({force: true}).type("5", {force: true})
    cy.get('[data-testid="mins_input"]').click().clear({force: true}).type("23", {force: true})
    cy.get('[data-testid="secs_input"]').click().clear({force: true}).type("-14", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="distance_input"]').click().clear({force: true}).type("5", {force: true})
    cy.get('[data-testid="mins_input"]').click().clear({force: true}).type("-23", {force: true})
    cy.get('[data-testid="secs_input"]').click().clear({force: true}).type("14", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="distance_input"]').click().clear({force: true}).type("-5", {force: true})
    cy.get('[data-testid="mins_input"]').click().clear({force: true}).type("23", {force: true})
    cy.get('[data-testid="secs_input"]').click().clear({force: true}).type("14", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="distance_input"]').click().clear({force: true}).type("5", {force: true})
    cy.get('[data-testid="mins_input"]').click().clear({force: true}).type("23", {force: true})
    cy.get('[data-testid="secs_input"]').click().clear({force: true}).type("14", {force: true})
    cy.get('[data-testid="save_exercise_button"]').click()

    cy.contains("Create New Workout").should("be.visible")
    cy.get('[data-testid="horizontal_scroll"]').should("be.visible")

    cy.get('[data-testID="enter_name_button"').click()
    cy.contains("Save Workout").should("be.visible") 
    cy.get('[data-testid="workout_name_input"]').click().type("Custom workout name", {force: true})
    cy.get('[data-testid="save_plan_button"]').click()
    cy.contains("h1", "Workout Plans").should("be.visible")
  })

  it("Checks the user is able to see a workout plan's information and track a workout from the info page", () => {
    cy.get('[data-testid="plans_scrollView"]').should("be.visible")
    cy.get('[data-testid="Custom workout name"]').should("be.visible")
    cy.get('[data-testid="Custom workout name"]').click()

    cy.contains("h1", "Workout Plan Information").should("be.visible")
    cy.wait(2000)

    cy.get('[data-testid="track_plan_button"]').click()
    cy.get('[data-testid="snackbar"]').should("be.visible")
    cy.contains("Close").click()

    cy.get('[data-testid="Jog In Place calories_input"]').click().clear({force: true}).type("280", {force: true})
    cy.get('[data-testid="Jog In Place mins_input"]').click().clear({force: true}).type("25", {force: true})
    cy.get('[data-testid="Jog In Place secs_input"]').click().clear({force: true}).type("03", {force: true})
    cy.get('[data-testid="Jog In Place distance_input"]').click().clear({force: true}).type("5.002", {force: true})
    cy.get('[data-testid="Machine Bicep Curl reps 0"]').click().clear({force: true}).type("3", {force: true})
    cy.get('[data-testid="Machine Bicep Curl reps 1"]').click().clear({force: true}).type("5", {force: true})
    cy.get('[data-testid="Machine Bicep Curl weight 0"]').click().clear({force: true}).type("7", {force: true})
    cy.get('[data-testid="Machine Bicep Curl weight 1"]').click().clear({force: true}).type("8", {force: true})
    cy.get('[data-testid="track_plan_button"]').click()
    cy.contains("h1", "Workout Plans").should("be.visible")
  })  

  it("Checks the user can delete a workout plan", () => {
    cy.get('[data-testid="plans_scrollView"]').should("be.visible")
    cy.get('[data-testid="Custom workout name"]').should("be.visible")
    cy.get('[data-testid="Custom workout name"]').click()
    cy.contains("h1", "Workout Plan Information").should("be.visible")
    cy.get('[data-testid="delete_plan_button"]').click()
    cy.get('[data-testid="plans_scrollView"]').should("be.visible")
    cy.get('[data-testid="Custom workout name"]').should("not.exist")
  })
})

describe("Check workout Stats Screen", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click() 
    cy.get('[data-testid="statsWidget"]').click()
  })

  it("Checks that all widgets render", () => {
    cy.get('[data-testid="graph_widget"]').should("be.visible")
    cy.get('[data-testid="history_widget"]').should("be.visible")
    cy.get('[data-testid="overall_widget"]').should("be.visible")
  })

  it("Checks graph widget navigates to graph screen and user can select exercise to see", () => {
    cy.get('[data-testid="graph_widget"]').click()
    cy.contains("h1", "Graph").should("be.visible")
    cy.get('[data-testid="select_exercise_button"]').click()
    cy.get('[data-testid="selection_modal"]').should("be.visible")
    cy.contains('Machine Bicep Curl').scrollIntoView().should("be.visible")
    cy.contains('Machine Bicep Curl').click()
    cy.get('[data-testid="selection_modal"]').should("not.be.visible")
    cy.get('[data-testid="weight_pulled_graph"]').should("be.visible")

    cy.get('[data-testid="select_exercise_button"]').click()
    cy.get('[data-testid="selection_modal"]').should("be.visible")
    cy.contains('Jog In Place').scrollIntoView().should("be.visible")
    cy.contains('Jog In Place').click()
    cy.get('[data-testid="selection_modal"]').should("not.be.visible")
    cy.get('[data-testid="calories_graph"]').scrollIntoView().should("be.visible")
    cy.get('[data-testid="distance_graph"]').scrollIntoView().should("be.visible")
  })

  it("Checks graph widget navigates to history screen and user can select data to see", () => {
    cy.get('[data-testid="history_widget"]').click()
    cy.contains("h1", "Past Workout Details").should("be.visible")
    cy.get('[data-testid="calendar_button"]')
  })

  it("Checks graph widget navigates to overall screen", () => {
    cy.get('[data-testid="overall_widget"]').click()
    cy.contains("h1", "Overall Stats").should("be.visible")
    cy.wait(8000).get('[data-testid="exercise_frequency_graph"]').should("be.visible")
    cy.get('[data-testid="type_frequency_graph"]').should("be.visible")
    cy.get('[data-testid="workout_frequency_graph"]').scrollIntoView().should("be.visible")
  })
})

describe("Check Workout History Screen", () => {
  beforeEach(() => {
    cy.get('a[href="/Fitness"]').click() 
    cy.get('[data-testid="historyWidget"]').click()
  })

  it("Checks if the tracked workouts are clickable", () => {
    cy.contains("h1", "Workout History").should("be.visible")
    cy.get('[data-testid="0"').click()
  })

  it("Checks that a tracked workout can be deleted" , () => {
    cy.get('[data-testid="0"]').then(($workout) => {
       const firstItem = $workout.text()
      cy.get('[data-testid="0"]').click() 
      cy.contains("h1", "Workout Information").should("be.visible") 
      cy.get('[data-testid="delete_button"').click() 
      cy.contains("h1", "Workout History").should("be.visible") 
      cy.get('[aria-label="Fitness Dashboard, back"]').click()
      cy.contains("h1", "Fitness Dashboard")
      cy.get('[data-testid="historyWidget"]').click()
      cy.get('[data-testid="0"]').then(($workout2) => {
        const newFirstItem = $workout2.text() 
        expect(firstItem).to.not.equal(newFirstItem) 
      })
    })
  })
})
