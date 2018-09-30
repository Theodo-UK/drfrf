import os

from setuptools import find_packages, setup


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


setup(
    name="drfrf",
    version="0.0.2",
    description="Django REST framework - redux-form connector",
    long_description=read("README.md"),
    long_description_content_type="text/markdown",
    author="Theodo",
    author_email="contact@theodo.co.uk",
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Environment :: Web Environment",
        "Framework :: Django",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Programming Language :: Python :: 3.7",
    ],
    keywords="django rest framework django-rest-framework redux form redux-form form validation",
    url="https://github.com/Theodo-UK/drfrf",
    license="MIT",
    packages=find_packages(),
    install_requires=["djangorestframework"],
)
