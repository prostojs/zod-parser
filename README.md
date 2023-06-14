# zod-parser

Zod-Parser is a powerful and flexible library for parsing generic Zod schemas in TypeScript. It provides a neat abstraction for parsing complex Zod schemas and is capable of accepting a callback function for further formatting the output, giving you the power to customize how you want to handle parsed schemas.

## Features

- Parses Zod Schemas into an understandable and manipulable structure.
- Supports Zod Objects, Arrays, Tuples, Records, Maps, Unions, Intersections and more.
- Allows for customization of output using a callback function.

## Installation

To install Zod-Parser, use npm:

```sh
npm i zod-parser
```

## Usage

### Basic Example:

```typescript
import { z } from 'zod';
import { parseZodType } from 'zod-parser';

const schema = z.object({
    name: z.string(),
    age: z.number().optional(),
    email: z.string().nullable(),
});

const parsedSchema = parseZodType(schema);

console.log(parsedSchema);
```

### Customizing Output with a Callback Function:

```typescript
import { z } from 'zod';
import { parseZodType } from 'zod-parser';

const schema = z.object({
    name: z.string(),
    age: z.number().optional(),
});

const format = (parsed: any) => {
    if (parsed.$type === 'ZodObject') {
        return 'I am an object';
    }
    return parsed;
};

const parsedSchema = parseZodType(schema, format);

console.log(parsedSchema);
```

## API Documentation

### parseZodType(zt, cb, opts)

- `zt: z.ZodType`: The Zod schema that you want to parse.
- `cb?: (p: TZodParsed) => T`: (optional) A callback function that takes the parsed schema and returns a customized output.
- `opts: object`: (optional) Options for parsing:
  - `$optional?: boolean`: Treat the schema as optional.
  - `$nullable?: boolean`: Treat the schema as nullable.
  - `$value?: unknown`: Set a default value for the schema.
  - `$args?: T`: Arguments for functions.
  - `$returns?: T`: Return value for functions.
  - `$get?: () => T`: Getter function for lazy types.
  - `$getDefault?: (() => unknown)`: Default value function.

**Returns**: The parsed schema in the format determined by the parser and any customization done by the callback function.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for discussion.

## License

zod-parser is [MIT licensed](./LICENSE).

---

Happy parsing! 🚀