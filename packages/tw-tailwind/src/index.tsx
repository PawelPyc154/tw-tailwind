/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */

import { intrinsicTagMap } from './utils/intrinsicTagMap'
import { templateComponentFactory } from './utils/templateComponentFactory'

const tw = Object.assign(templateComponentFactory, intrinsicTagMap)

export default tw

