import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren, ReactNode } from 'react'

const ErrorMessage = ({ children }: PropsWithChildren) => {
    if (!children) return null;
  
    return (
        <Text color="red" as="p">{children}</Text>
    ) /* if errors.title is truthy, then the Text container will show, with the text of the error message*/
    /* the "as='p'" means that we want this error to show up as a paragraph element. This helps with how the text is shown */
}

export default ErrorMessage