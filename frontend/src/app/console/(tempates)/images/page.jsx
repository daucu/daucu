"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Page(params) {
  const router = useRouter();

  const web_tech = [
    {
      id: 0,
      name: "WordPress",
      description:
        " WordPress is a free and open-source content management system written in PHP and paired with a MySQL or MariaDB database.",
      icon: "https://logo.daucu.com/new/wordpress-icon.svg",
      image: "wordpress",
      target_port: 80,
      environments: [
        {
          name: "WORDPRESS_DB_HOST",
          value: "value",
        },
        {
          name: "WORDPRESS_DB_USER",
          value: "value",
        },
        {
          name: "WORDPRESS_DB_PASSWORD",
          value: "value",
        },
        {
          name: "WORDPRESS_DB_NAME",
          value: "value",
        },
        {
          name: "WORDPRESS_TABLE_PREFIX",
          value: "wp_",
        },
      ],
    },
    {
      id: 3570,
      name: "TensorFlow",
      description:
        "TensorFlow is an open-source, popular machine learning framework developed by Google that enables the building, training, and deployment of machine learning models. It provides a comprehensive ecosystem of tools, libraries, and resources for various tasks in machine learning and deep learning, including neural networks, computer vision, natural language processing, and more.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1915px-Tensorflow_logo.svg.png",
      image: "tensorflow/tensorflow:latest-jupyter",
      target_port: 8888,
      environments: [],
    },
    {
      id: 35,
      name: "Vault",
      description:
        "Vault is a tool for securely accessing secrets via a unified interface and tight access control.",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-vault-logo.png",
      image: "vault",
      target_port: 8200,
      environments: [
        {
          name: "VAULT_DEV_ROOT_TOKEN_ID",
          value: "value",
        },
      ],
    },
    {
      id: 556,
      name: "NextCloud",
      description: "☁️ Nextcloud server, a safe home for all your data ",
      icon: "https://static-00.iconduck.com/assets.00/nextcloud-icon-512x512-quluhp24.png",
      image: "nextcloud",
      target_port: 80,
      environments: [],
    },
    {
      id: 1,
      name: "Drupal",
      description:
        "Drupal is a free and open-source content-management framework written in PHP and distributed under the GNU General Public License.",
      icon: "https://cdn.worldvectorlogo.com/logos/drupal.svg",
      image: "drupal",
      target_port: 80,
      environments: [
        {
          name: "MYSQL_DATABASE",
          value: "value",
        },
        {
          name: "MYSQL_USER",
          value: "value",
        },
        {
          name: "MYSQL_PASSWORD",
          value: "value",
        },
        {
          name: "MYSQL_ROOT_PASSWORD",
          value: "value",
        },
      ],
    },
    {
      id: 2,
      name: "Grafana",
      description:
        "Grafana is a multi-platform open source analytics and interactive visualization web application. It provides charts, graphs, and alerts for the web when connected to supported data sources.",
      icon: "https://cdn.worldvectorlogo.com/logos/grafana.svg",
      image: "grafana/grafana",
      target_port: 3000,
      environments: [],
    },
    {
      id: 2,
      name: "Minecraft",
      description:
        "Minecraft is a game made from blocks that you can transform into whatever you can imagine",
      icon: "https://cdn.icon-icons.com/icons2/2699/PNG/512/minecraft_logo_icon_168974.png",
      image: "itzg/minecraft-server",
      target_port: 25565,
      environments: [],
    },
    {
      id: 2,
      name: "Registry",
      description:
        "The Docker Registry 2.0 implementation for storing and distributing Docker images",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-registry-logo.png",
      image: "registry:2",
      target_port: 5000,
      environments: [],
    },
    {
      id: 2,
      name: "Bitbucket Server",
      description:
        "Bitbucket Server is an on-premises source code management solution for Git that's secure, fast, and enterprise grade. Create and manage repositories, set up fine-grained permissions, and collaborate on code - all with the flexibility of your servers.",
      icon: "https://pbs.twimg.com/profile_images/1026981625291190272/35O2KIRX_400x400.jpg",
      image: "atlassian/bitbucket-server",
      target_port: 7990,
      environments: [
        {
          name: "SEARCH_ENABLED",
          value: false,
        },
        {
          name: "JDBC_DRIVER",
          value: "value",
        },
        {
          name: "JDBC_USER",
          value: "value",
        },
        {
          name: "JDBC_PASSWORD",
          value: "value",
        },
        {
          name: "JDBC_URL",
          value: "value",
        },
        {
          name: "PLUGIN_SEARCH_CONFIG_BASEURL",
          value: "value",
        },
      ],
    },
    {
      id: 2,
      name: "Joomla",
      description:
        "Joomla is a free and open-source content management system (CMS) for publishing web content. It is built on a model–view–controller web application framework that can be used independently of the CMS.",
      icon: "https://cdn.worldvectorlogo.com/logos/joomla.svg",
      image: "joomla",
      target_port: 80,
      environments: [
        {
          name: "JOOMLA_DB_HOST",
          value: "value",
        },
        {
          name: "JOOMLA_DB_USER",
          value: "value",
        },
        {
          name: "JOOMLA_DB_PASSWORD",
          value: "value",
        },
        {
          name: "JOOMLA_DB_NAME",
          value: "value",
        },
      ],
    },
    {
      id: 3,
      name: "PhpMyAdmin",
      description:
        "PhpMyAdmin is a free software tool written in PHP, intended to handle the administration of MySQL over the Web.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/PhpMyAdmin_logo.svg/1280px-PhpMyAdmin_logo.svg.png",
      image: "phpmyadmin/phpmyadmin",
      target_port: 80,
      environments: [
        {
          name: "PMA_HOST",
          value: "value",
        },
        {
          name: "MYSQL_ROOT_PASSWORD",
          value: "value",
        },
        {
          name: "MYSQL_USER",
          value: "value",
        },
        {
          name: "MYSQL_PASSWORD",
          value: "value",
        },
      ],
    },
    {
      id: 4,
      name: "CodeIgniter",
      description:
        "CodeIgniter is an open-source PHP web application framework, for use in building dynamic web sites with PHP.",
      icon: "https://cdn.worldvectorlogo.com/logos/codeigniter.svg",
      image: "bitnami/codeigniter",
      target_port: 80,
      environments: [],
    },
    {
      id: 4456,
      name: "Hoppscotch",
      description: "Open source API development ecosystem",
      icon: "https://avatars.githubusercontent.com/u/56705483",
      image: "hoppscotch/hoppscotch",
      target_port: 3000,
      environments: [],
    },
    {
      id: 5,
      name: "Jenkins",
      description:
        "Jenkins is an open source automation server. It helps to automate the non-human part of the software development process, with continuous integration and facilitating technical aspects of continuous delivery.",
      icon: "https://cdn.worldvectorlogo.com/logos/jenkins.svg",
      image: "jenkins",
      target_port: 8080,
      environments: [],
    },
    {
      id: 6,
      name: "Kibana",
      description:
        "Kibana is an open source data visualization plugin for Elasticsearch. It provides visualization capabilities on top of the content indexed on an Elasticsearch cluster.",
      icon: "https://cdn.worldvectorlogo.com/logos/elastic-kibana.svg",
      image: "kibana",
      target_port: 5601,
      environments: [],
    },
    {
      id: 7,
      name: "Solr",
      description:
        "Apache Solr is an open source enterprise search platform, written in Java, from the Apache Lucene project.",
      icon: "https://cdn.worldvectorlogo.com/logos/solr.svg",
      image: "solr",
      target_port: 8983,
      environments: [],
    },
    {
      id: 8,
      name: "Rocket Chat",
      description:
        "Rocket.Chat is a free and open source web, desktop and mobile chat platform built on the Meteor JavaScript Application Platform.",
      icon: "https://cdn.worldvectorlogo.com/logos/rocket-chat.svg",
      image: "rocket.chat",
      target_port: 3000,
      environments: [],
    },
    {
      id: 9,
      name: "Red Mine",
      description:
        "Redmine is a free and open source, web-based project management and issue tracking tool.",
      icon: "https://media.trustradius.com/product-logos/NG/r3/L1BJGTE8HK3O.PNG",
      image: "redmine",
      target_port: 3000,
      environments: [],
    },
    {
      id: 10,
      name: "Mediawiki",
      description:
        "MediaWiki is a free and open-source wiki package written in PHP, originally for use on Wikipedia.",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/MediaWiki-2020-icon.svg/2048px-MediaWiki-2020-icon.svg.png",
      image: "mediawiki",
      target_port: 80,
      environments: [],
    },
    {
      id: 11,
      name: "Post Fix Admin",
      description:
        "Postfix Admin is a web based interface used to manage mailboxes, virtual domains and aliases for Postfix, Dovecot and MySQL.",
      icon: "https://styles.redditmedia.com/t5_2ub10/styles/communityIcon_uisxd1pkk2n71.png",
      image: "postfixadmin",
      target_port: 80,
      environments: [],
    },
    {
      id: 12,
      name: "Portainer",
      description:
        "Portainer is a lightweight management UI which allows you to easily manage your Docker host or Swarm cluster.",
      icon: "https://cdn.worldvectorlogo.com/logos/portainer.svg",
      image: "portainer/portainer",
      target_port: 9000,
      environments: [],
    },
    {
      id: 13,
      name: "supabase/postgres",
      description:
        "PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.",
      icon: "https://cdn.worldvectorlogo.com/logos/postgresql.svg",
      image: "supabase/postgres",
      target_port: 5432,
      environments: [
        {
          name: "POSTGRES_PASSWORD",
          value: "value",
        },
      ],
    },
    {
      id: 14,
      name: "Moodle",
      description:
        "Moodle is a free and open-source learning management system (LMS) written in PHP and distributed under the GNU General Public License.",
      icon: "https://cdn.icon-icons.com/icons2/2415/PNG/512/moodle_original_logo_icon_146420.png",
      image: "bitnami/moodle",
      target_port: 80,
      environments: [
        {
          name: "ALLOW_EMPTY_PASSWORD",
          value: "yes",
        },
        {
          name: "MOODLE_DATABASE_USER",
          value: "value",
        },
        {
          name: "MOODLE_DATABASE_PASSWORD",
          value: "value",
        },
        {
          name: "MOODLE_DATABASE_NAME",
          value: "value",
        },
      ],
    },
    {
      id: 15,
      name: "Open Search",
      description:
        "OpenSearch is a community-driven, open source fork of Elasticsearch.",
      icon: "https://opensearch.org/assets/opensearch-twitter-card.png",
      image: "opensearchproject/opensearch",
      target_port: 9200,
      environments: [
        {
          name: "discovery.type",
          value: "single-node",
        },
      ],
    },
    {
      id: 16,
      name: "Hasura",
      description:
        "Hasura GraphQL Engine is a blazing-fast GraphQL server that gives you instant, realtime GraphQL APIs over Postgres, with webhook triggers on database events for asynchronous business logic.",
      icon: "https://hasura.io/brand-assets/hasura-icon-primary.png",
      image: "hasura/graphql-engine",
      target_port: 8080,
      environments: [
        {
          name: "HASURA_GRAPHQL_DATABASE_URL",
          value: "value",
        },
        {
          name: "HASURA_GRAPHQL_ENABLE_CONSOLE",
          value: "true",
        },
        {
          name: "HASURA_GRAPHQL_ADMIN_SECRET",
          value: "value",
        },
      ],
    },
    {
      id: 17,
      name: "Lightstreamer",
      description:
        "Lightstreamer is a real-time messaging server optimized for the Internet. Blending WebSockets, HTTP, and push notifications, it streams data to/from mobile, tablet, browser-based, desktop, and IoT applications.",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-lightstreamer-logo.png",
      image: "lightstreamer",
      target_port: 8080,
      environments: [],
    },
    {
      id: 18,
      name: "Mysql",
      description:
        "MySQL is a widely used, open-source relational database management system (RDBMS).",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-mysql-logo.png",
      image: "mysql",
      target_port: 3306,
      environments: [
        {
          name: "MYSQL_ROOT_PASSWORD",
          value: "value",
        },
      ],
    },
    {
      id: 19,
      name: "Chronograf",
      description:
        "Chronograf is a visualization tool for time series data in InfluxDB.",
      icon: "https://img.stackshare.io/service/9371/YwbWN39g_400x400.jpg",
      image: "chronograf",
      target_port: 8888,
      environments: [],
    },
    {
      id: 20,
      name: "Owncloud",
      description:
        "ownCloud is an open-source file sync, share and content collaboration software that lets teams work on data easily from anywhere",
      icon: "https://www.svgrepo.com/show/361935/owncloud.svg",
      image: "owncloud/server",
      target_port: 8080,
      environments: [],
    },
    {
      id: 21,
      name: "Convertigo",
      description:
        "Enterprise grade full-stack Open source Low Code & No Code Platform for web & mobile application",
      icon: "https://d1q6f0aelx0por.cloudfront.net/product-logos/library-convertigo-logo.png",
      image: "convertigo",
      target_port: 28080,
      environments: [],
    },
    {
      id: 22,
      name: "Netdata",
      description:
        "Netdata collects metrics per second and presents them in beautiful low-latency dashboards. It is designed to run on all of your physical and virtual servers, cloud deployments, Kubernetes clusters, and edge/IoT devices, to monitor everything you run.",
      icon: "https://www.gravatar.com/avatar/a8c92a9f903aa48bf505cd5f2cade664?s=80&r=g&d=mm",
      image: "netdata/netdata",
      target_port: 19999,
      environments: [],
    },
    {
      id: 22,
      name: "Jira-software",
      description:
        "Jira Software is a software development tool used by agile teams.",
      icon: "https://www.gravatar.com/avatar/14a1dfcf20cb05fbb75ea0a163d34acc?s=80&r=g&d=mm",
      image: "atlassian/jira-software",
      target_port: 8080,
      environments: [],
    },
    {
      id: 23,
      name: "Code Server",
      description:
        "Run VS Code on any machine anywhere and access it through the browser.",
      icon: "https://www.gravatar.com/avatar/4c9dd1fd94cb9c193bbca99a70bba51c?s=80&r=g&d=mm",
      image: "codercom/code-server",
      target_port: 8080,
      environments: [
        {
          name: "PASSWORD",
          value: "value",
        },
      ],
    },
    {
      id: 23,
      name: "Memos",
      description:
        "A privacy-first, lightweight note-taking service. Easily capture and share your great thoughts",
      icon: "https://logo.daucu.com/memos.png",
      image: "neosmemo/memos:stable",
      target_port: 5230,
      environments: [],
    },
    {
      id: 23,
      name: "Roundcube",
      description: "The Roundcube Webmail suite",
      icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Roundcube_logo_icon.svg/1024px-Roundcube_logo_icon.svg.png",
      image: "roundcube/roundcubemail",
      target_port: 80,
      environments: [
        {
          name: "ROUNDCUBEMAIL_DEFAULT_HOST",
          value: "tls://imap.example.com",
        },
        {
          name: "ROUNDCUBEMAIL_DEFAULT_PORT",
          value: "143",
        },
        {
          name: "ROUNDCUBEMAIL_SMTP_SERVER",
          value: "tls://smtp.example.com",
        },
        {
          name: "ROUNDCUBEMAIL_SMTP_PORT",
          value: "587",
        },
        {
          name: "ROUNDCUBEMAIL_PLUGINS",
          value: "archive,zipdownload",
        },
        {
          name: "ROUNDCUBEMAIL_UPLOAD_MAX_FILESIZE",
          value: "5M",
        },
      ],
    },
    {
      id: 23,
      name: "Strapi",
      description:
        "The most advanced open-source headless CMS to build powerful APIs with no effort.",
      icon: "https://www.gravatar.com/avatar/718fd5519adbb61787b3c482da9d0033?s=120&r=g&d=404",
      image: "strapi/strapi",
      target_port: 1337,
      environments: [
        {
          name: "DATABASE_CLIENT",
          value: "sqlite, postgres, mysql ,mongo",
        },
        {
          name: "DATABASE_NAME",
          value: "strapi",
        },
        {
          name: "DATABASE_HOST",
          value: "0.0.0.0",
        },
        {
          name: "DATABASE_PORT",
          value: "1234",
        },
        {
          name: "DATABASE_USERNAME",
          value: "strapi",
        },
        {
          name: "DATABASE_PASSWORD",
          value: "strapi",
        },
      ],
    },
    {
      id: 23,
      name: "Excalidraw",
      description: "Virtual whiteboard for sketching hand-drawn like diagrams ",
      icon: "https://www.gravatar.com/avatar/c30205a67cba99de65e1af1d721817a4?s=120&r=g&d=404",
      image: "excalidraw/excalidraw",
      target_port: 80,
      environments: [],
    },
    {
      id: 23,
      name: "Microweber",
      description:
        "Microweber is a Drag and Drop website builder and a powerful CMS of a new, modern generation, based on the PHP Laravel Framework. You can use Microweber to quickly and simply make any kind of website, online store and blog. ",
      icon: "https://images.crunchbase.com/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/bqogl3ycqmwsgyb4qeap",
      image: "microweber/microweber",
      target_port: 80,
      environments: [],
    },
    {
      id: 23,
      name: "Linkstack",
      description:
        "LinkStack is a highly customizable link sharing platform with an intuitive, easy to use user interface.",
      icon: "https://raw.githubusercontent.com/LinkStackOrg/branding/main/logo/svg/logo_animated.svg",
      image: "linkstackorg/linkstack:V4",
      target_port: 80,
      environments: [],
    },
    {
      id: 23,
      name: "Mautic",
      description: "Mautic is an open source marketing automation platform.",
      icon: "https://www.mautic.org/sites/default/files/2020-03/Mautic_Logo_LB.png",
      image: "mautic/mautic",
      target_port: 80,
      environments: [
        {
          name: "MAUTIC_DB_HOST",
          value: "host.example.com",
        },
        {
          name: "MAUTIC_DB_USER",
          value: "root",
        },
        {
          name: "MAUTIC_DB_PASSWORD",
          value: "7388139606",
        },
        {
          name: "MAUTIC_DB_NAME",
          value: "mysql",
        },
        {
          name: "MAUTIC_RUN_CRON_JOBS",
          value: "true",
        },
      ],
    },
    {
      id: 23,
      name: "Chatpad",
      description: "Not just another ChatGPT user-interface!",
      icon: "https://raw.githubusercontent.com/deiucanta/chatpad/9e64f19c12477cca1e79a987e18e7b09c391effa/src/assets/favicon.png",
      image: "ghcr.io/deiucanta/chatpad:latest",
      target_port: 80,
      environments: [],
    },
  ];

  // Make search working
  const [search, setSearch] = useState("");
  const [web_tech_filtered, setWebTechFiltered] = useState(web_tech);

  function searchFilter() {
    setWebTechFiltered(
      web_tech.filter(
        (item) =>
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase())
      )
    );

    if (search === "") {
      setWebTechFiltered(web_tech);
    }
  }

  const [docker_deploying, setDockerDeploying] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [template, setTemplate] = useState({});

  const [env, setEnv] = useState([
    {
      name: "",
      value: "",
    },
  ]);

  //Convert to variable array like [SOME_KEY=SOME_VALUE, SOME_KEY2=SOME_VALUE2]
  function makeEnvArray() {
    let env_array = [];
    env.forEach((item) => {
      if (item.name !== "" && item.value !== "") {
        env_array.push(`${item.name}=${item.value}`);
      }
    });
    return env_array;
  }

  async function templateDeployment() {
    setDockerDeploying(true);
    await axios
      .post(
        `/api/kube/template-deploy`,
        {
          name: template.name.toLowerCase(),
          image: template.image,
          icon: template.icon,
          target_port: parseInt(template.target_port),
          description: template.description,
          variables: makeEnvArray(),
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        setDockerDeploying(false);
        setShowTemplateModal(false);
        router.push(`/console/web`, {
          scroll: true,
        });
        toast(res.data.message, { type: "success" });
        setTab("web");
        getWebsites();
      })
      .catch((err) => {
        console.log(err);
        setDockerDeploying(false);
        setShowTemplateModal(false);
        toast(err.response?.data?.message, { type: "error" });
      });
  }

  return (
    <div className="flex w-auto flex-col h-auto absolute inset-0 bottom-2 top-2 ml-2 mr-2 dark:bg-slate-900">
      <blockquote className="bg-white border-l-[5px] border-blue-600 dark:border-gray-500 dark:bg-gray-900 relative h-full">
        <div className="h-full relative dark:bg-slate-900 p-2 flex flex-col space-y-3">
          {/* Heading */}
          <div className="flex flex-col justify-between items-start h-[50px]">
            <h1 className="text-xl font-bold dark:text-gray-400 text-black">
              Container Images & Templates
            </h1>
            <span className="text dark:text-gray-400 text-black text-xs">
              Deploy your container images and templates in Daucu Cloud Run or
              Kubernetes Cluster in one click.
            </span>
          </div>
          {/* Search */}
          <div className="join max-w-sm">
            <div>
              <div>
                <input
                  className="input rounded-sm input-sm input-bordered active bg-slate-200 dark:text-gray-400 text-black dark:bg-slate-800 join-item"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyUp={searchFilter}
                />
              </div>
            </div>
            <select className="select w-full rounded-sm select-sm select-bordered active bg-slate-200 dark:text-gray-400 text-black dark:bg-slate-800 join-item">
              <option disabled selected>
                Filter
              </option>
              <option>Social</option>
              <option>Blog</option>
              <option>eCommerce</option>
            </select>
            <div className="indicator">
              <button className="btn w-full rounded-sm btn-sm btn-bordered active  join-item">
                Search
              </button>
            </div>
          </div>
          <div className="h-full overflow-y-scroll relative">
            <div className="w-full mt-4 h-auto inset-0 bottom-0 relative">
              {web_tech_filtered.length === 0 ? (
                // Loading
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-gray-900 border-b-4"></div>
                </div>
              ) : (
                <ul className="grid gap-2 grid-cols-3 2xl:grid-cols-8 xl:grid-cols-6 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 select-none">
                  {/* Loop */}
                  {web_tech_filtered.map((item, index) => (
                    <div
                      key={index}
                      className="inline-flex border-blue-600 justify-start items-start p-3 w-full text-gray-500 cursor-pointer dark:hover:text-gray-300 border-l-4 dark:border-gray-500 peer-checked:border-blue-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-slate-700 dark:hover:bg-slate-700 bg-slate-200 rounded-sm container z-40"
                    >
                      <label className="cursor-pointer">
                        <input
                          type="checkbox"
                          id={item._id}
                          value=""
                          className="hidden peer"
                          required=""
                          onClick={() => {
                            setShowTemplateModal(true);
                            setTemplate(item);
                            setEnv(item.environments);
                          }}
                        />
                        <div className="flex flex-col">
                          <div className="flex w-full justify-between">
                            <img src={item.icon} alt="" className="w-10 h-10" />
                            <div>
                              {/* Pricing */}
                              <div className="flex items-center justify-center">
                                <div className="flex items-center justify-center rounded-full text-sm dark:text-gray-200 text-black">
                                  Free Trial
                                </div>
                              </div>
                            </div>
                          </div>
                          <div
                            className="w-full text-lg dark:text-gray-200 text-black"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.name}
                          </div>
                          <div
                            className="w-full text-xs overflow-ellipsis dark:text-gray-200 text-black"
                            style={{
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              display: "-webkit-box",
                              overflow: "hidden",
                            }}
                          >
                            {item.description}
                          </div>
                        </div>
                      </label>
                    </div>
                  ))}
                </ul>
              )}
            </div>

            {/* Show Popup */}
            <input
              type="checkbox"
              id="my-modal"
              className="modal-toggle"
              checked={showTemplateModal}
              onChange={() => {}}
            />
            <div className="modal w-full">
              <div className="modal-box rounded-none dark:bg-slate-700 bg-slate-100 w-11/12 max-w-5xl">
                <h3 className="font-bold text-lg text-left dark:text-slate-200 text-slate-600">
                  You are going to{" "}
                  {template.name
                    ? "deploy " + template.name
                    : "deploy a new project"}{" "}
                  on Cloud Run
                </h3>
                <p className="text-left mt-2 text-sm">{template.description}</p>
                {/* Domain Name */}
                <div className="mt-2 w-[100%]">
                  <label className="label">
                    <span className="label-text dark:text-slate-200 text-slate-600">
                      Project Name?
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="Project Name"
                    className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                    value={template.name}
                    onChange={(e) => {
                      setTemplate({ ...template, name: e.target.value });
                    }}
                  />
                </div>
                {/* Image */}
                <div className="mt-2 w-[100%]">
                  <label className="label">
                    <span className="label-text dark:text-slate-200 text-slate-600">
                      Your image name?
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="image"
                    className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                    value={template.image}
                    onChange={(e) => {
                      setTemplate({ ...template, image: e.target.value });
                    }}
                  />
                </div>
                {/* Port */}
                <div className="mt-2 w-[100%]">
                  <label className="label">
                    <span className="label-text dark:text-slate-200 text-slate-600">
                      What port exposing?
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="80"
                    className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                    value={template.target_port}
                    onChange={(e) => {
                      setTemplate({
                        ...template,
                        target_port: e.target.value,
                      });
                    }}
                  />
                </div>
                {/* Env */}
                <div className="mt-2 w-[100%]">
                  <label className="label">
                    <span className="label-text dark:text-slate-200 text-slate-600">
                      Your envirement variables?
                    </span>
                    <span
                      className="label-text-alt cursor-pointer underline dark:text-slate-200 text-slate-600"
                      onClick={() => {
                        setEnv([...env, { name: "", value: "" }]);
                      }}
                    >
                      Add environment variables
                    </span>
                  </label>
                  {env.map((value, index) => {
                    return (
                      <div className="flex mt-2 w-auto" key={index}>
                        <input
                          type="text"
                          placeholder="Name"
                          className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 mr-1 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                          value={value.name}
                          onChange={(e) => {
                            const list = [...env];
                            list[index].name = e.target.value;
                            setEnv(list);
                          }}
                        />
                        <input
                          type="text"
                          placeholder="Value"
                          className="input input-bordered w-full rounded-sm input-sm dark:bg-slate-900 bg-slate-200 ml-1 placeholder:dark:text-slate-200 placeholder:text-slate-600 dark:text-slate-200 text-slate-600"
                          value={value.value}
                          onChange={(e) => {
                            const list = [...env];
                            list[index].value = e.target.value;
                            setEnv(list);
                          }}
                        />
                        {/* Remove */}
                        <button
                          className="btn btn-sm rounded-sm no-animation"
                          onClick={() => {
                            const list = [...env];
                            list.splice(index, 1);
                            setEnv(list);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              sstrokelinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="modal-action">
                  <label
                    htmlFor="my-modal"
                    className="btn btn-sm rounded-sm no-animation"
                    onClick={() => {
                      setShowTemplateModal(false);
                    }}
                  >
                    Cancel
                  </label>
                  <label
                    className={`btn btn-sm rounded-sm no-animation btn-success ${
                      docker_deploying ? "btn-disabled" : ""
                    }`}
                    onClick={templateDeployment}
                  >
                    <span
                      className={
                        docker_deploying ? "loading loading-spinner" : ""
                      }
                    ></span>
                    {docker_deploying ? "Deploying" : "Deploy on Cloud Run"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </blockquote>
    </div>
  );
}
