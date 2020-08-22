/** @jsx jsx */
import { jsx } from 'theme-ui';

const Card = () => {
  return (
    <div
      sx={{
        backgroundColor: 'muted', // picks up value from `theme.colors.foreground`
        borderRadius: 4, // raw CSS value
        fontSize: 4, // picks up value from `theme.fontSizes[4]`
        margin: 3, // picks up value from `theme.space[3]`
        padding: 3, // picks up value from `theme.space[3]`
      }}
    >
      <h2
        sx={{
          fontFamily: 'heading', // picks up value from `theme.fonts.heading`
          fontWeight: 'heading', // picks up value from `theme.fontWeights.heading`
          fontSize: [3, 4, 5], // shorthand for specifying responsive values
          margin: 0,
        }}
      >
        Heading
      </h2>
      <p
        sx={{
          fontFamily: 'heading',
          fontWeight: 'heading',
          fontSize: [1, 2],
          color: 'muted',
          marginBottom: 2,
        }}
      >
        A new tagline
      </p>
      <p
        sx={{
          fontSize: [1, 2],
          marginTop: 0,
          marginBottom: 3,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a dui
        erat. Vivamus malesuada facilisis est, sit amet interdum turpis feugiat
        id.
      </p>
      <a
        sx={{
          backgroundColor: 'primary',
          borderRadius: '100em',
          color: 'text',
          display: 'inline-block',
          fontFamily: 'heading',
          fontSize: [0, 1],
          fontWeight: 'bold',
          marginBottom: 1,
          px: 3, // shorthand for defining padding-left and padding-right
          py: 2, // shorthand for defining padding-top and padding-bottom
          textDecoration: 'none',
          textTransform: 'uppercase',
          '&:hover, &:focus': { backgroundColor: 'secondary' },
        }}
        href="/"
      >
        Read More
      </a>
    </div>
  );
};

export default Card;
