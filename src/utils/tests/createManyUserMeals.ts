import { prisma } from '@/lib/prisma'

interface ICreateManyUserMealsInput {
  email?: string
  caseTwo?: boolean
  caseThree?: boolean
}

export async function createManyUserMeals({ email, caseTwo, caseThree }: ICreateManyUserMealsInput) {
  let user
  if (!email) {
    user = await prisma.user.findFirstOrThrow()
  } else {
    user = await prisma.user.findUniqueOrThrow({
      where: {
        email
      }
    })
  }


  const date = new Date().setDate(new Date().getDate() + 2)
  const dayInMs = 1000 * 60 * 60 * 24
  
  let meals: any = []

  const mealPrisma = await prisma.meals.createMany({
    data: [
      {
        name: 'register meals',
        description: 'description meals',
        isDiet: true,
        user_id: user.id,
        created_at: new Date(date + dayInMs),
        updated_at: new Date(date + dayInMs)

      },
      {
        name: 'register meals',
        description: 'description meals',
        isDiet: true,
        user_id: user.id,
        created_at: new Date(date + dayInMs * 2),
        updated_at: new Date(date + dayInMs * 2)

      },
      {
        name: 'register meals',
        description: 'description meals',
        isDiet: true,
        user_id: user.id,
        created_at: new Date(date + dayInMs * 3),
        updated_at: new Date(date + dayInMs * 3)

      },
    ]
  })
  meals = mealPrisma
  if (caseTwo) {
    const meal = await prisma.meals.create({
      data: {
        name: 'register meals',
        description: 'description meals',
        isDiet: false,
        user_id: user.id,
        created_at: new Date(date + dayInMs * 4),
        updated_at: new Date(date + dayInMs * 4)
      }
    })
    //meals.push(meal)
  }
  if (caseThree) {
    const mealPrisma = await prisma.meals.createMany({
      data: [
        {
          name: 'register meals',
          description: 'description meals',
          isDiet: false,
          user_id: user.id,
          created_at: new Date(date + dayInMs * 4),
          updated_at: new Date(date + dayInMs * 4)
        },
        {
          name: 'register meals',
          description: 'description meals',
          isDiet: true,
          user_id: user.id,
          created_at: new Date(date + dayInMs * 5),
          updated_at: new Date(date + dayInMs * 5)
        },
      ]
    })
   // meals.push(mealPrisma)
  }

  return {
    meals,
    user,
    
  }
}


