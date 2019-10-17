import {navigateTo} from 'svero';

/**
 * The URLs here are taken from App.svelte.
 */

/**
 * Goes to the instruction page once a layout is chosen.
 */
export function toLayoutStart(layout) {
  navigateTo(`/layout/${layout}`);
}
