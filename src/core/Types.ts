type TaggedType<Tag extends string, T> = {
    _tag: Tag;
} & T
type ResultError<T = unknown> = {
    ok: false,
    error: T
}
type ResultSuccess<T> = T & {ok: true};
export const createResultSuccess = <T>(prop: T): ResultSuccess<T> => ({
    ok: true,
    ...prop
})
export const createResultError = <T>(_error: T): ResultError<T> => ({
    ok: false,
    error: _error
})
type Result<Success, Error = unknown> = Success & {ok: true} | ResultError<Error>
export type {
    Result,
    TaggedType,
    ResultError
}