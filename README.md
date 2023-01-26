# esperance

Rust std utilities, now in JS/TS

## Installation

```bash
npm i esperance
```

## Usage

```ts
import { Ok, Err } from 'esperance';

const ok = Ok(42);
if (ok.isOk()) {
  console.log(ok.unwrap());
}

const err = Err('error');
if (err.isErr()) {
  console.log('Err');
}
```

```ts
import { Some, None } from 'esperance';

const option = Some(42);
if (option.isSome()) {
  console.log(option.unwrap());
}

const none = None;
if (none.isNone()) {
  console.log('None');
}
```

## License

This project is licensed under the MIT license.
