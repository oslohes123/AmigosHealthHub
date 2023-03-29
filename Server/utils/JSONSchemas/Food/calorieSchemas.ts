export const insertCalorieGoal = {
  type: 'object',
  properties: {
    UserID: {
      type: 'string'
    },
    CalorieGoal: {
      type: 'integer'
    },
    Date: {
      type: 'string',
      format: 'date'
    }
  },
  required: ['UserID', 'CalorieGoal', 'Date']
}

export const readSpecificCalorieGoals = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    }
  },
  required: ['id']
}

export const readAllCalorieGoals = {
  type: 'object',
  properties: {
    UserID: {
      type: 'string'
    }
  },
  required: ['UserID']
}

export const updateCalorieGoal = {
  type: 'object',
  properties: {
    CalorieGoal: {
      type: 'integer'
    },
    id: {
      type: 'string'
    }
  },
  required: ['CalorieGoal', 'id']
}

export const deleteSpecificCalorieGoal = {
  type: 'object',
  properties: {
    id: {
      type: 'string'
    }
  },
  required: ['id']
}
