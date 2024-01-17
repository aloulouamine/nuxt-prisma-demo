<template>
  <div class="grid gap-8 mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
    <div class="bg-white items-end border-gray-300 px-2">
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
              <img :src="`https://ui-avatars.com/api/?name=${review.author}&format=svg`" :alt="`${review.author}.`"
                class="h-12 w-12 rounded-full" />

              <div class="ml-4 sm:ml-0 sm:mt-4">
                <p class="text-sm font-medium text-gray-900">{{ review.author }}</p>
                <div class="mt-2 flex items-center">
                  <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating"
                    :class="[review.rating > rating ? 'text-gray-900' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']"
                    aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full border-b-2 border-gray-200"></div>
    <!-- post review form  -->
    <div class="flex w-full items-start space-x-4 sticky top-0">
      <div class="flex-shrink-0">
        <img class="inline-block h-10 w-10 rounded-full" src="https://ui-avatars.com/api/?name=John+Doe&format=svg"
          alt="" />
      </div>
      <div class="min-w-0 flex-1">
        <form @submit.prevent="submitReview()" class="relative">
          <div
            class="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label for="author" class="sr-only">Author</label>
            <input v-model="author" type="text" name="author" id="author"
              class="block w-full border-0 pt-2.5 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="Name" />
            <label for="title" class="sr-only">Title</label>
            <input type="text" name="title" id="title" v-model="title"
              class="block w-full border-0 text-lg font-medium placeholder:text-gray-400 focus:ring-0"
              placeholder="Title" />
            <label for="description" class="sr-only">Description</label>
            <textarea rows=" 2" name="description" id="description" v-model="content"
              class="block w-full resize-none border-0 py-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Write a review..." />

            <!-- Spacer element to match the height of the toolbar -->
            <div aria-hidden="true">
              <div class="py-2">
                <div class="h-9" />
              </div>
              <div class="h-px" />
              <div class="py-2">
                <div class="py-px">
                  <div class="h-9" />
                </div>
              </div>
            </div>
          </div>

          <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div class="flex items-center space-x-5">
              <div class="flex items-center">
                <button type="button"
                  class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                  <PaperClipIcon class="h-5 w-5" aria-hidden="true" />
                  <span class="sr-only">Attach a file</span>
                </button>
              </div>
              <div class="flex items-center">
                <Listbox as="div" v-model="selected" by="value">
                  <ListboxLabel class="sr-only">Your mood</ListboxLabel>
                  <div class="relative">
                    <ListboxButton
                      class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                      <span class="flex items-center justify-center">
                        <span v-if="selected.value === null">
                          <FaceSmileIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                          <span class="sr-only">Add your mood</span>
                        </span>
                        <span v-if="!(selected.value === null)">
                          <span :class="[selected.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                            <component :is="selected.icon" class="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                          </span>
                          <span class="sr-only">{{ selected.name }}</span>
                        </span>
                      </span>
                    </ListboxButton>

                    <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
                      leave-to-class="opacity-0">
                      <ListboxOptions
                        class="absolute z-10 -ml-6 mt-1 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                        <ListboxOption as="template" v-for="mood in moods" :key="mood.value" :value="mood"
                          v-slot="{ active }">
                          <li
                            :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                            <div class="flex items-center">
                              <div :class="[mood.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                                <component :is="mood.icon" :class="[mood.iconColor, 'h-5 w-5 flex-shrink-0']"
                                  aria-hidden="true" />
                              </div>
                              <span class="ml-3 block truncate font-medium">{{ mood.name }}</span>
                            </div>
                          </li>
                        </ListboxOption>
                      </ListboxOptions>
                    </transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div class="flex-shrink-0">
              <button type="submit"
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Post</button>
            </div>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>
<script setup lang="ts">

import { StarIcon } from '@heroicons/vue/24/solid'

import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import {
  FaceFrownIcon,
  FaceSmileIcon,
  FireIcon,
  HandThumbUpIcon,
  HeartIcon,
  PaperClipIcon,
  XMarkIcon,
} from '@heroicons/vue/24/solid'


const moods = [
  { name: 'Excited', value: 5, icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
  { name: 'Loved', value: 4, icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
  { name: 'Happy', value: 3, icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
  { name: 'Sad', value: 1, icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
  { name: 'Thumbsy', value: 2, icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
  { name: 'I feel nothing', value: 99, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
]

const selected = ref(moods[0])
const content = ref('')
const title = ref('')
const author = ref('')

const { data: reviews, refresh } = useAsyncData('reviews', async () => await $fetch('/api/reviews/reviews'))


const submitReview = async () => {
  await $fetch("/api/reviews/reviews", {
    method: "POST",
    body: JSON.stringify({
      title: title.value,
      content: content.value,
      rating: selected.value.value,
      author: author.value
    })
  })
  refresh()
}

</script>