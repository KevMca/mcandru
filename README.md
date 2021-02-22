<p align="center">
    <img alt="LekoArts" src="https://img.lekoarts.de/gatsby/gatsby-site-illustration.png" />
</p>
<h1 align="center">
  Mcand.ru
</h1>

<p align="center">
  <a href="https://github.com/LekoArts/gatsby-starter-minimal-blog/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="Minimal Blog is released under the MIT license." />
  </a>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs welcome!" />
  <a href="https://twitter.com/intent/follow?screen_name=lekoarts_de">
    <img src="https://img.shields.io/twitter/follow/lekoarts_de.svg?label=Follow%20@lekoarts_de" alt="Follow @lekoarts_de" />
  </a>
</p>

Using the Gatsby Theme [`@lekoarts/gatsby-theme-minimal-blog`](https://github.com/LekoArts/gatsby-themes/tree/master/themes/gatsby-theme-minimal-blog). Modified by Michael and Kevin McAndrew for a personal project blog site.

Also be sure to checkout other LekoArts themes [Free & Open Source Gatsby Themes](https://themes.lekoarts.de)

## ✨ Layout

There are three types of content:

1. Pages (in folder `/content/pages`)
2. Posts (in folder `/content/posts`)
3. Projects (in folder `/content/projects`)

### Pages

Any extra pages. At the moment this just includes author pages:

```
  === Author Page ===

  ---
  title: Name
  slug: "/name"
  ---

  <ProfileHeader />   // Image must be different name to other mdx files
  - Tagline
  - Description
  <AuthorProjects />
```

### Posts

#### MDX

All small incremental updates regarding a specific project. Tags are filtered to
automatically place posts on the correct pages of projects.

```
  === Post ===

  ---
  title: "Post title"
  date: yyyy-mm-dd
  slug: "/post-title"
  tags:
      - tag
  ---

  ... body of post
```

#### Jupyter Notebook

If you want to share a Jupyter notebook as a post rather than by using MDX, simply add the `.ipynb` file to a new post folder.

You will need to tell Gatsby the same frontmatter information as in an MDX post. A Jupyter notebook is just a JSON object so
you can open the raw `.ipynb` file JSON and add the frontmatter to the metadata object:

```
{
  "metadata": {
    "title": "Jupyter Test",
    "date": "2021.02.21",
    "slug": "/jupyter-test",
    "tags": ["fault-detection"],
    ...
  },
  ...
}
```

If you have the VS Code Jupyter extension installed, you will either have to use a different editor to access the raw JSON or
disable the extension temporarily. I will have a look again to see if there's a more streamlined way of doing this in future
but it will do for now.

Check out the example in: `content/jupyter-test` too if you want to see how it works.

### Projects

Projects are added ontop of the existing functionality of the Minimal Blog LekoArts
theme. Project pages allow the reader to get a quick overview of the project or
to look at more detailed posts about the project too.

```
  === Project ===

  ---
  title: Title
  slug: "/title"
  status: "in progress"
  authors:
    - author
  ---

  <Project
  headerImage={Image}
  title="Title"
  status="in progress"
  buttons={[
  {
    ...
  },
  ]}
  postsFilter="Filter"
  >

  - About
  <Timeline>
    <TimelineItem />
    <TimelineItem />
    ...
  </Timeline>
  -Updates
  <ProjectPosts />

  </ Project>
```
