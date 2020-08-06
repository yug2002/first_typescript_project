export default interface IPredicate {
  (predicate: Function, ...args: any): Promise<boolean>
}