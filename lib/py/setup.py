from setuptools import find_packages, setup

setup(
    name="drfrf",
    version="0.0.1",
    description="Django REST framework - redux-form connector",
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
