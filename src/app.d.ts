// See https://kit.svelte.dev/docs/types#app

import type { MonzoAPI } from "@otters/monzo";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      loggedIn: boolean;
      monzoClient: MonzoAPI;
    }
    // interface PageData {}
    // interface Platform {}
  }
}

export {};
