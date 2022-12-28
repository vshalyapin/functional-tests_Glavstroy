import { defineConfig } from 'cypress'
import getCompareSnapshotsPlugin from 'cypress-image-diff-js/dist/plugin';

// need to install these dependencies
// npm i lodash del --save-dev
// const _ = require('lodash')
// const del = require('del')

export default defineConfig({
  projectId: '6e2yyg',
  viewportWidth: 1920,
  viewportHeight: 1080,
  chromeWebSecurity: false,
  videoCompression: 32,
  env: {
    screenshotsFolder: './cypress/snapshots/actual',
    trashAssetsBeforeRuns: true,
    video: false
  },
  e2e: {
    // setupNodeEvents(on, config) {
    //   getCompareSnapshotsPlugin(on, config)
    // }
    // The example below shows how to delete the recorded video for specs that had no retry attempts or failures when using Cypress test retries.
    // setupNodeEvents(on, config) {
    //   on('after:spec', (spec, results) => {
    //     if (results && results.video) {
    //       // Do we have failures for any retry attempts?
    //       const failures = _.some(results.tests, (test) => {
    //         return _.some(test.attempts, { state: 'failed' })
    //       })
    //       if (!failures) {
    //         // delete the video if the spec passed and no tests retried
    //         return del(results.video)
    //     }
    //   }
    // })
    // }
  }
})