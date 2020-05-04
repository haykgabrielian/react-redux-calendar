"use strict";

import {is} from "immutable";
import {createSelectorCreator, defaultMemoize} from "reselect";

export const createSelector: any = createSelectorCreator(defaultMemoize, is);
