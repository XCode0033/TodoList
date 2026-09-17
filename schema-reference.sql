--
-- PostgreSQL database dump
--

\restrict DaJbZItiN2dhTbwc1usARDbVaIptylA2o4nvoxtsdGxnjQVjgW8GyaFFasCfik9

-- Dumped from database version 18.3 (Homebrew)
-- Dumped by pg_dump version 18.3 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: xavier
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO xavier;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: xavier
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pgmigrations_id_seq OWNER TO xavier;

--
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xavier
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- Name: todo; Type: TABLE; Schema: public; Owner: xavier
--

CREATE TABLE public.todo (
    todo_id integer NOT NULL,
    todo_title character varying(255) NOT NULL,
    todo_category character varying(100),
    todo_priority character varying(50),
    todo_description text,
    todo_due_date date,
    todo_completed boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.todo OWNER TO xavier;

--
-- Name: todo_todo_id_seq; Type: SEQUENCE; Schema: public; Owner: xavier
--

CREATE SEQUENCE public.todo_todo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.todo_todo_id_seq OWNER TO xavier;

--
-- Name: todo_todo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: xavier
--

ALTER SEQUENCE public.todo_todo_id_seq OWNED BY public.todo.todo_id;


--
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: xavier
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- Name: todo todo_id; Type: DEFAULT; Schema: public; Owner: xavier
--

ALTER TABLE ONLY public.todo ALTER COLUMN todo_id SET DEFAULT nextval('public.todo_todo_id_seq'::regclass);


--
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: xavier
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- Name: todo todo_pkey; Type: CONSTRAINT; Schema: public; Owner: xavier
--

ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (todo_id);


--
-- PostgreSQL database dump complete
--

\unrestrict DaJbZItiN2dhTbwc1usARDbVaIptylA2o4nvoxtsdGxnjQVjgW8GyaFFasCfik9

