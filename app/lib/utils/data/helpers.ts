import { setArray, putVal } from "~/lib/GunDb";
import { APP_KEY_PAIR } from "~/session.server";


export const blogs = [
    {
        tags: ['Finance', 'Money'],
        title: 'Work at home',
        categ: 'Video',
        img: '/images/blog/1.jpg',
        desc: 'All public Data is encrypted with app keys....',
    },
    {
        tags: ['CNXT', 'FLTNGMMTH'],
        title: 'test123',
        categ: 'Oui',
        img: '/images/blog/2.jpg',
        desc: 'All private data is encrypted with USER_ID!!',
    },
    {
        tags: ['Bresnow', 'Pardo'],
        title: 'test1234',
        categ: 'Oui',
        img: '/images/blog/3.jpg',
        desc: 'The new supercar is here, 543 cv and 140 000$ !!',
    },
    {
        tags: ['Car', 'Money'],
        title: 'test12345',
        img: '/images/blog/4.jpg',
        desc: 'The new supercar is here, 543 cv and 140 000$ !!',
    },

];

export const loadDummy = (userId: string, blogs: Array<any>) => {
    blogs.forEach(async (blog) => {
        blog.tags.forEach(async (tag) => {
            let set = await setArray(`${userId}/articles/${blog.title}/tags`, [
                tag,
            ]);
            if (!set) {
                console.log('Did not Load The Dummy Tags');
            }
        });

        delete blog.tags;

        let put = await putVal(
            `${userId}/articles`,
            blog.title,
            blog,
            APP_KEY_PAIR,
            `${userId}/articles/set`
        );

        if (!put) {
            console.log('Did not Load The Dummy Articles');
        }
        console.log('success');
    });
}
