<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
  <div class="bg-white">
    <div>
      <h2 id="reviews-heading" class="sr-only">Reviews</h2>

      <div class="space-y-10">
        <div v-for="review in reviews" :key="review.id" class="flex flex-col sm:flex-row">
          <div class="order-2 mt-6 sm:ml-16 sm:mt-0">
            <h3 class="text-sm font-medium text-gray-900">{{ review.title }}</h3>
            <p class="sr-only">{{ review.rating }} out of 5 stars</p>

            <div class="mt-3 space-y-6 text-sm text-gray-600" v-html="review.content" />
          </div>

          <div class="order-1 flex items-center sm:flex-col sm:items-start">
            <img :src="`https://ui-avatars.com/api/?name=${review.author}&format=svg`" :alt="`${review.author}.`" class="h-12 w-12 rounded-full" />

            <div class="ml-4 sm:ml-0 sm:mt-4">
              <p class="text-sm font-medium text-gray-900">{{ review.author }}</p>
              <div class="mt-2 flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[review.rating > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>
<script setup lang="ts">

const reviews = [
  {
    id: 1,
    title: 'This is the best white t-shirt out there',
    rating: 5,
    content: `
      <p>I've searched my entire life for a t-shirt that reflects every color in the visible spectrum. Scientists said it couldn't be done, but when I look at this shirt, I see white light bouncing right back into my eyes. Incredible!</p>
    `,
    author: 'Mark Edwards',
    
  },
  {
    id: 2,
    title: 'Adds the perfect variety to my wardrobe',
    rating: 4,
    content: `
      <p>I used to be one of those unbearable minimalists who only wore the same black v-necks every day. Now, I have expanded my wardrobe with three new crewneck options! Leaving off one star only because I wish the heather gray was more gray.</p>
    `,
    author: 'Blake Reid',
    
  },
  {
    id: 3,
    title: 'All good things come in 6-Packs',
    rating: 5,
    content: `
      <p>Tasty beverages, strong abs that will never be seen due to aforementioned tasty beverages, and these Basic Tees!</p>
    `,
    author: 'Ben Russel',
  },
]
</script>