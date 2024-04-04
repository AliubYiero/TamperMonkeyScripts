/**
 * 确认条件是否存在于过滤器链中,
 * 如果存在则返回 true
 *
 * @param parma
 * @param filterChain
 * */
export const filterChain = <T>( filterChain: ( ( parma?: T ) => boolean )[], parma?: T ): boolean => {
	return filterChain.some( filter => filter( parma ) );
};
