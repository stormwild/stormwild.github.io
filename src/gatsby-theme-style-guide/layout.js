/** @jsx jsx */
import { jsx } from "theme-ui"

import React from 'react'
import { Box } from 'theme-ui'

export default props => <><Box sx={{
    // this uses the value from `theme.space[4]`
    padding: 4,
    // these use values from `theme.colors`
    color: "text",
    backgroundColor: "background",
}}>{props.children}</Box></>
