export {};

declare global {
  interface Contact {
    name: string;
    vacancy: string;
    phone: string;
    id: string;
  }

  type Errors = Partial<Record<keyof Contact, string>>;
}
