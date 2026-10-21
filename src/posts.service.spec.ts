import { Post, PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  const post: Omit<Post, 'id' | 'date'> = {
    text: 'Mocked post',
  };

  beforeEach(async () => {
    postsService = new PostsService();

    postsService.create({ text: 'Some pre-existing post' });
  });

  it('should add a new post', () => {
    const createdPost = postsService.create(post);

    expect(createdPost).toEqual({
      ...post,
      id: '2',
      date: expect.any(String),
    });
    expect(new Date(createdPost.date).toISOString()).toBe(createdPost.date);
    expect(postsService.find('2')).toEqual(createdPost);
  });

  it('should find a post', () => {
    const createdPost = postsService.create(post);

    expect(postsService.find(createdPost.id)).toEqual(createdPost);
    expect(postsService.find('1')).toEqual(
      expect.objectContaining({ id: '1', text: 'Some pre-existing post' }),
    );
    expect(postsService.find('999')).toBeUndefined();
  });
});